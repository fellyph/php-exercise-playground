# PHP Learning Playground (PHP Scholar)

Este es un prototipo de una herramienta interactiva para estudiantes de PHP, utilizando WebAssembly (**PHP-WASM**) para ejecutar código directamente en el navegador.

## 🚀 Cómo Ejecutar

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2. En el directorio del proyecto, instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Accede a `http://localhost:5173`.

## 🛠️ Tecnologías Utilizadas

- **@php-wasm/web-8-3**: El motor de PHP que funciona en WebAssembly.
- **CodeMirror 6**: Editor de código moderno con soporte para PHP.
- **Vite**: Herramienta de compilación rápida para el frontend.
- **TypeScript**: Para una mejor experiencia de desarrollo y validación de errores.

## 💡 Cómo funciona

La herramienta carga el entorno de ejecución de PHP 8.3 a través de WASM. Cuando el estudiante hace clic en "Ejecutar" (o usa `Ctrl+Enter`), el código del editor es procesado por el motor de PHP, que evalúa el script y ejecuta los casos de prueba asociados.

## 📂 Estructura del Proyecto

- `index.html`: Estructura de la interfaz de usuario.
- `src/style.css`: Estilo premium (Modo oscuro moderno).
- `src/main.ts`: Lógica de integración entre PHP + Editor.
- `src/ExerciseManager.ts`: Gestiona la carga y validación de ejercicios.
- `public/exercises/`: Archivos Markdown que contienen las instrucciones y pruebas de los ejercicios.

## 📚 Ejercicios Disponibles

1. **Suma de Enteros** (`soma`): Conceptos básicos sobre funciones y suma.
2. **Multiplicación de Enteros** (`multiplicar`): Conceptos básicos sobre funciones y multiplicación.
3. **Navegación de Objetos** (`objetos`): Acceso a propiedades de objetos anidados con `->`.
4. **Manejo de Arrays** (`arrays`): Adición de elementos a arreglos de PHP.
5. **Clases y Objetos** (`classes`): Creación de clases, modificadores de acceso y métodos.
6. **Manipulación de Strings** (`strings`): Uso de funciones nativas para invertir texto.

## 🌐 Soporte Multilingüe

El playground soporta:

- 🇧🇷 Portugués (`/pt/` o `?lang=pt`)
- 🇺🇸 Inglés (`/en/` o `?lang=en`)
- 🇪🇸 Español (`/es/` o `?lang=es`)
- 🇮🇹 Italiano (`/it/` o `?lang=it`)
