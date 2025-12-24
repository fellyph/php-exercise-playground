import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { resolve } from "path";

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  assetsInclude: ["**/*.dat"],
  optimizeDeps: {
    include: ["ini"],
    exclude: ["@php-wasm/web", "@php-wasm/universal", "@wp-playground/common"],
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      ini: "ini",
      path: "path-browserify",
      module: resolve(__dirname, "src/stubs/module.js"),
      "./lib/extensions/intl/shared/icu.dat": resolve(
        __dirname,
        "node_modules/@php-wasm/web/shared/icu.dat"
      ),
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      external: ["env", "wasi_snapshot_preview1", /^GOT\..*$/],
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
