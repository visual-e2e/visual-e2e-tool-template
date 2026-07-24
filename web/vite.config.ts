import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const webRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: webRoot,
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: Number(process.env.TOOL_WEB_PORT ?? "__WEB_DEV_PORT__"),
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${process.env.TOOL_PORT ?? "__DEV_PORT__"}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: path.join(webRoot, "dist"),
    emptyOutDir: true,
  },
});
