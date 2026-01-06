import yaml from "js-yaml";

interface TestCase {
  input: any[];
  output: string;
}

interface Exercise {
  id: string;
  title: string;
  functionName: string;
  args: string[];
  tests: TestCase[];
  instructions: string;
}

export class ExerciseManager {
  private currentExercise: Exercise | null = null;

  constructor() {
    this.currentExercise = null;
  }

  async loadExercise(url: string): Promise<Exercise> {
    const response = await fetch(url);
    const text = await response.text();

    // Parse Frontmatter
    const parts = text.split("---");
    if (parts.length < 3) {
      throw new Error("Invalid exercise file format");
    }

    const frontmatter = parts[1];
    const body = parts.slice(2).join("---");

    const metadata = yaml.load(frontmatter) as any;

    this.currentExercise = {
      id: metadata.id,
      title: metadata.title || "Untitled",
      functionName: metadata.functionName || "somar",
      args: metadata.args || ["$a", "$b"],
      tests: metadata.tests || [],
      instructions: body.trim(),
    };

    return this.currentExercise;
  }

  /**
   * Generates the PHP code to run tests against the user's solution.
   * @param userCode
   * @returns Logic to run tests and output JSON result
   */
  generateTestRunner(userCode: string): string {
    if (!this.currentExercise) return userCode;

    const tests = this.currentExercise.tests;
    const testJson = JSON.stringify(tests);
    const functionName = this.currentExercise.functionName;

    // Wrap user code in ob_start to capture all output
    const wrappedCode = `<?php ob_start(); ?>${userCode}<?php $userOutput = ob_get_clean(); ?>`;

    const runnerCode = `
<?php
// --- END USER DATA ---

$tests = json_decode('${testJson}', false);
$results = [];

foreach ($tests as $index => $test) {
    $input = $test->input;
    $expected = $test->output;
    
    try {
        // Prepare to capture function-specific output if any
        ob_start();
        if (function_exists('${functionName}')) {
            $actual = call_user_func_array('${functionName}', $input);
        } else {
             throw new Exception("Função '${functionName}' não encontrada.");
        }
        $testOutput = ob_get_clean();
        
        // Combine with user level output if needed, or just use as result
        if ($actual === null && !empty($testOutput)) {
             $actual = trim($testOutput);
        }

        // Compare using JSON encoding to support arrays and objects
        // We use loose equality because expected values from MD might be strings while actual return values might be integers
        $expectedEncoded = json_encode($expected, JSON_UNESCAPED_UNICODE);
        $actualEncoded = json_encode($actual, JSON_UNESCAPED_UNICODE);

        $passed = ($actualEncoded === $expectedEncoded);
        
        // If strict JSON comparison fails, try loose comparison for numeric values
        if (!$passed && is_numeric($actual) && is_numeric($expected)) {
            $passed = ((string)$actual === (string)$expected);
        }
        
        // Convert to string for display
        $actualStr = (is_array($actual) || is_object($actual)) ? json_encode($actual, JSON_UNESCAPED_UNICODE) : (string)$actual;
        
        $results[] = [
            'id' => $index + 1,
            'input' => $input,
            'expected' => is_string($expected) ? $expected : json_encode($expected, JSON_UNESCAPED_UNICODE),
            'actual' => $actualStr,
            'passed' => $passed
        ];
    } catch (Throwable $e) {
        $results[] = [
            'id' => $index + 1,
            'input' => $input,
            'expected' => is_string($expected) ? $expected : json_encode($expected, JSON_UNESCAPED_UNICODE),
            'error' => $e->getMessage(),
            'passed' => false
        ];
    }
}

echo $userOutput; // Print captured user output
echo "---TEST_RESULTS_START---";
echo json_encode(['results' => $results], JSON_UNESCAPED_UNICODE);
echo "---TEST_RESULTS_END---";
?>`;

    return wrappedCode + runnerCode;
  }
}
