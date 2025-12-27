import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { php } from "@codemirror/lang-php";
import { oneDark } from "@codemirror/theme-one-dark";
import { PHP } from "@php-wasm/universal";
import { loadWebRuntime } from "@php-wasm/web";
import { ExerciseManager } from "./ExerciseManager";
import { marked } from "marked";

interface TestResult {
  id: number;
  input: any[];
  expected: string;
  actual?: string;
  passed: boolean;
  error?: string;
}

const initialPhpCode = `<?php
function somar($a, $b) {
    // Escreva seu código aqui
    return 0;
}
?>`;

let editor: EditorView;
let phpEngine: PHP;
const exerciseManager = new ExerciseManager();

async function init() {
  const editorContainer = document.getElementById("editor-container");
  const outputEl = document.getElementById("output");
  const runBtn = document.getElementById("run-btn");

  if (!editorContainer || !outputEl || !runBtn) {
    console.error("Required DOM elements not found");
    return;
  }

  // Initialize CodeMirror
  const state = EditorState.create({
    doc: initialPhpCode,
    extensions: [basicSetup, php(), oneDark, EditorView.lineWrapping],
  });

  editor = new EditorView({
    state,
    parent: editorContainer,
  });

  outputEl.textContent = "Carregando motor PHP...";

  // Initialize PHP WASM
  try {
    const runtime = await loadWebRuntime("8.3");
    phpEngine = new PHP(runtime);
    console.log("PHP Engine loaded", phpEngine);
    outputEl.textContent = "PHP Pronto. Carregando exercício...";

    // Load Exercise
    await loadExercise();
    outputEl.textContent = "Pronto para começar.";
  } catch (e: any) {
    outputEl.textContent = "Erro ao carregar: " + e.message;
    console.error(e);
  }

  runBtn.addEventListener("click", runCode);
}

async function loadExercise() {
  const instructionsEl = document.getElementById("exercise-content");
  if (!instructionsEl) return;

  try {
    // In a real app, this URL would be dynamic
    const exercise = await exerciseManager.loadExercise(
      "./src/exercises/soma.md"
    );

    // Render Instructions
    instructionsEl.innerHTML = await marked.parse(exercise.instructions);
  } catch (e) {
    console.error("Failed to load exercise", e);
    instructionsEl.innerHTML = "<p>Erro ao carregar exercício.</p>";
  }
}

async function runCode() {
  const outputEl = document.getElementById("output");
  const statusEl = document.getElementById("test-status");

  if (!outputEl || !statusEl || !editor) return;

  const code = editor.state.doc.toString();

  outputEl.textContent = "Executando...";
  statusEl.textContent = "⏳";
  statusEl.className = "";

  try {
    if (!phpEngine) {
      outputEl.textContent = "PHP Engine not ready.";
      return;
    }

    // Generate code with test runner
    const validadedCode = exerciseManager.generateTestRunner(code);

    // Run PHP
    const result = await phpEngine.runStream({
      code: validadedCode,
    });

    const fullOutput = await result.stdoutText || ""; 

    // Parse Check
    const separatorStart = "---TEST_RESULTS_START---";
    const separatorEnd = "---TEST_RESULTS_END---";

    if (fullOutput.includes(separatorStart)) {
      const parts = fullOutput.split(separatorStart);
      const userOutput = parts[0];
      const testResultJson = parts[1].split(separatorEnd)[0];

      const testData = JSON.parse(testResultJson);
      renderTestResults(userOutput, testData.results);
    } else {
      // No test results found (maybe syntax error or didn't run to completion)
      outputEl.innerHTML = fullOutput;
      statusEl.textContent = "⚠️ Erro";
      statusEl.className = "fail";
    }
  } catch (e: any) {
    outputEl.textContent = "Erro de Execução: " + e.message;
    statusEl.textContent = "❌ Erro";
    statusEl.className = "fail";
  }
}

function renderTestResults(userOutput: string, results: TestResult[]) {
  const outputEl = document.getElementById("output");
  const statusEl = document.getElementById("test-status");

  if (!outputEl || !statusEl) return;

  let html = "";
  if (userOutput.trim()) {
    html += `Output do seu código:\n${userOutput}\n\n`;
  }

  let allPassed = true;

  html += "Resultados dos Testes:\n";
  results.forEach((r) => {
    if (r.passed) {
      html += `✅ Teste ${r.id}: Passou\n`;
    } else {
      allPassed = false;
      html += `❌ Teste ${r.id}: Falhou\n`;
      html += `   Input: ${JSON.stringify(r.input)}\n`;
      html += `   Esperado: ${r.expected}\n`;
      if (r.error) {
        html += `   Erro: ${r.error}\n`;
      } else {
        html += `   Obtido: ${r.actual}\n`;
      }
    }
  });

  outputEl.textContent = html;

  if (allPassed) {
    statusEl.textContent = "✅ Aprovado";
    statusEl.className = "pass";
  } else {
    statusEl.textContent = "❌ Falhou";
    statusEl.className = "fail";
  }
}

init();
