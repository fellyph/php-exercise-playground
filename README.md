# PHP Learning Playground (PHP Scholar)

This is a prototype of an interactive tool for PHP students, using WebAssembly (**PHP-WASM**) to execute code directly in the browser.

## 🚀 How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. In the project directory, install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access `http://localhost:5173`.

## 🛠️ Technologies Used

- **@php-wasm/web-8-3**: The PHP engine running in WebAssembly.
- **CodeMirror 6**: Modern code editor with PHP support.
- **Vite**: Fast build tool for the frontend.
- **TypeScript**: For better development experience and error validation.

## 💡 How it works

The tool loads the PHP 8.3 runtime via WASM. When the student clicks "Run" (or uses `Ctrl+Enter`), the editor's code is processed by the PHP engine, which evaluates the script and runs the associated test cases.

## 📂 Project Structure

- `index.html`: UI structure.
- `src/style.css`: Premium styling (Modern Dark Mode).
- `src/main.ts`: Integration logic between PHP + Editor.
- `src/ExerciseManager.ts`: Manages loading and validation of exercises.
- `public/exercises/`: Markdown files containing exercise instructions and tests.

## 📚 Available Exercises

1. **Sum of Integers** (`soma`): Basics about functions and addition.
2. **Multiplication of Integers** (`multiplicar`): Basics about functions and multiplication.
3. **Object Navigation** (`objetos`): Accessing nested object properties with `->`.
4. **Handling Arrays** (`arrays`): Adding elements to PHP arrays.
5. **Classes and Objects** (`classes`): Creating classes, access modifiers, and methods.
6. **String Manipulation** (`strings`): Using native functions to reverse text.

## 🌐 Multilanguage Support

The playground supports:

- 🇧🇷 Portuguese (`/pt/` or `?lang=pt`)
- 🇺🇸 English (`/en/` or `?lang=en`)
- 🇪🇸 Spanish (`/es/` or `?lang=es`)
- 🇮🇹 Italian (`/it/` or `?lang=it`)
