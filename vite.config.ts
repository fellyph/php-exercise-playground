import { defineConfig } from "vite";

import topLevelAwait from "vite-plugin-top-level-await";
import { resolve } from "path";

export default defineConfig({
  base: "/",
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
    },
  },
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ["env", "wasi_snapshot_preview1", /^GOT\..*$/],
      onwarn(warning, warn) {
        if (warning.code === "EVAL" && warning.id?.includes("php-wasm")) return;
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@codemirror") || id.includes("codemirror")) {
              return "codemirror";
            }
            if (id.includes("marked") || id.includes("js-yaml")) {
              return "parsers";
            }
            if (id.includes("@php-wasm")) {
              return "php-wasm-bridge";
            }
            return "vendor";
          }
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
