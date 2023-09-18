import { crx } from "@crxjs/vite-plugin";
import devtools from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

import { manifest } from "./src/manifest";

export default defineConfig({
  plugins: [
    devtools(),
    solidPlugin(),
    tsconfigPaths(),
    crx({ manifest }),
    {
      name: "a",
    },
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      input: "src/embed/index.tsx",
    },
  },
  css: {
    postcss: {
      plugins: [
      ],
    },
  },
});
