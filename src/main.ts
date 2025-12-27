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

let currentLanguage = "pt";

const uiTranslations: Record<string, any> = {
  pt: {
    run: "Executar (Ctrl+Enter) ▶",
    result: "Resultado",
    loadingPhp: "Carregando motor PHP...",
    phpReady: "PHP Pronto. Carregando exercício...",
    ready: "Pronto para começar.",
    executing: "Executando...",
    error: "Erro",
    fail: "Falhou",
    passed: "Aprovado",
    userOutput: "Output do seu código:",
    testResults: "Resultados dos Testes:",
    testLabel: "Teste",
    passedLabel: "Passou",
    failedLabel: "Falhou",
    inputLabel: "Input",
    expectedLabel: "Esperado",
    obtainedLabel: "Obtido",
    errorLabel: "Erro",
    placeholder: "Escreva seu código aqui",
  },
  en: {
    run: "Run (Ctrl+Enter) ▶",
    result: "Result",
    loadingPhp: "Loading PHP engine...",
    phpReady: "PHP Ready. Loading exercise...",
    ready: "Ready to start.",
    executing: "Executing...",
    error: "Error",
    fail: "Failed",
    passed: "Passed",
    userOutput: "Your code output:",
    testResults: "Test Results:",
    testLabel: "Test",
    passedLabel: "Passed",
    failedLabel: "Failed",
    inputLabel: "Input",
    expectedLabel: "Expected",
    obtainedLabel: "Obtained",
    errorLabel: "Error",
    placeholder: "Write your code here",
  },
  es: {
    run: "Ejecutar (Ctrl+Enter) ▶",
    result: "Resultado",
    loadingPhp: "Cargando motor PHP...",
    phpReady: "PHP Listo. Cargando ejercicio...",
    ready: "Listo para comenzar.",
    executing: "Ejecutando...",
    error: "Error",
    fail: "Falló",
    passed: "Aprobado",
    userOutput: "Salida de tu código:",
    testResults: "Resultados de las Pruebas:",
    testLabel: "Prueba",
    passedLabel: "Pasó",
    failedLabel: "Falló",
    inputLabel: "Entrada",
    expectedLabel: "Esperado",
    obtainedLabel: "Obtenido",
    errorLabel: "Error",
    placeholder: "Escriba su código aquí",
  },
};

function getInitialPhpCode(functionName: string, lang: string = "pt") {
  const comment = uiTranslations[lang]?.placeholder || uiTranslations.pt.placeholder;
  return `<?php
function ${functionName}($a, $b) {
    // ${comment}
    return 0;
}
?>`;
}

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
    doc: getInitialPhpCode("somar"),
    extensions: [basicSetup, php(), oneDark, EditorView.lineWrapping],
  });

  editor = new EditorView({
    state,
    parent: editorContainer,
  });

  const langSelect = document.getElementById("language-select") as HTMLSelectElement;
  if (langSelect) {
    langSelect.addEventListener("change", async (e) => {
      currentLanguage = (e.target as HTMLSelectElement).value;
      updateUiLanguage();
      if (phpEngine) {
        await loadExercise();
      }
    });
  }

  runBtn.addEventListener("click", runCode);

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

}

function updateUiLanguage() {
  const t = uiTranslations[currentLanguage];
  const runBtn = document.getElementById("run-btn");
  const resultLabel = document.querySelector(".output-header span:first-child");
  const title = document.querySelector("header h1");
  
  if (runBtn) runBtn.textContent = t.run;
  if (resultLabel) resultLabel.textContent = t.result;
  if (title) title.textContent = currentLanguage === "pt" ? "PHP Interativo" : (currentLanguage === "en" ? "Interactive PHP" : "PHP Interactivo");
}

async function loadExercise() {
  const instructionsEl = document.getElementById("exercise-content");
  if (!instructionsEl) return;

  try {
    // Load based on language
    const exercise = await exerciseManager.loadExercise(
      `./src/exercises/${currentLanguage}/soma.md`
    );

    // Render Instructions
    instructionsEl.innerHTML = await marked.parse(exercise.instructions);

    // Update editor with exercise-specific stub
    const newContent = getInitialPhpCode(exercise.functionName, currentLanguage);
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: newContent },
    });
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

  const t = uiTranslations[currentLanguage];

  let html = "";
  if (userOutput.trim()) {
    html += `${t.userOutput}\n${userOutput}\n\n`;
  }

  let allPassed = true;

  html += `${t.testResults}\n`;
  results.forEach((r) => {
    if (r.passed) {
      html += `✅ ${t.testLabel} ${r.id}: ${t.passedLabel}\n`;
    } else {
      allPassed = false;
      html += `❌ ${t.testLabel} ${r.id}: ${t.failedLabel}\n`;
      html += `   ${t.inputLabel}: ${JSON.stringify(r.input)}\n`;
      html += `   ${t.expectedLabel}: ${r.expected}\n`;
      if (r.error) {
        html += `   ${t.errorLabel}: ${r.error}\n`;
      } else {
        html += `   ${t.obtainedLabel}: ${r.actual}\n`;
      }
    }
  });

  outputEl.textContent = html;

  if (allPassed) {
    statusEl.textContent = `✅ ${t.passed}`;
    statusEl.className = "pass";
  } else {
    statusEl.textContent = `❌ ${t.fail}`;
    statusEl.className = "fail";
  }
}

init();
