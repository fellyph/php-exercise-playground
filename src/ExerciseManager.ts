import yaml from "js-yaml";

interface TestCase {
  input: any[];
  output: string;
}

interface Exercise {
  title: string;
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

    const metadata = yaml.load(frontmatter) as Partial<Exercise>;

    this.currentExercise = {
      title: metadata.title || "Untitled",
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

    // PHP snippet to append
    const runnerCode = `
?>
<?php
// --- END USER DATA ---

$tests = json_decode('${testJson}', true);
$results = [];

foreach ($tests as $index => $test) {
    $input = $test['input'];
    $expected = $test['output'];
    
    try {
        // Capture output if the function prints instead of returning
        ob_start();
        if (function_exists('somar')) {
            $actual = call_user_func_array('somar', $input);
        } else {
             throw new Exception("Função 'somar' não encontrada.");
        }
        $output = ob_get_clean();
        
        // If function returned nothing, check captured output (optional, depending on exercise type)
        if ($actual === null && !empty($output)) {
             $actual = trim($output);
        }

        // Convert to string for comparison to match expected output format
        $actualStr = (string)$actual;
        
        $passed = ($actualStr === $expected);
        
        $results[] = [
            'id' => $index + 1,
            'input' => $input,
            'expected' => $expected,
            'actual' => $actualStr,
            'passed' => $passed
        ];
    } catch (Throwable $e) {
        $results[] = [
            'id' => $index + 1,
            'input' => $input,
            'expected' => $expected,
            'error' => $e->getMessage(),
            'passed' => false
        ];
    }
}

echo "---TEST_RESULTS_START---";
echo json_encode(['results' => $results]);
echo "---TEST_RESULTS_END---";
?>`;

    return userCode + "\n" + runnerCode;
  }
}
