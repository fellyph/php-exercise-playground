import { defineConfig } from "vite";

import topLevelAwait from "vite-plugin-top-level-await";
import { resolve } from "path";

export default defineConfig({
  plugins: [topLevelAwait()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  assetsInclude: ["**/*.dat", "**/*.wasm"],
  optimizeDeps: {
    include: ["ini"],
    exclude: [
      "@php-wasm/web",
      "@php-wasm/web-8-3",
      "@php-wasm/universal",
      "@wp-playground/common"
    ],
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    dedupe: ["@php-wasm/universal"],
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
