import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
/* export default defineConfig({
  // base: "/worldwise/",
  plugins: [react()],
}); */

/* export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
  };
  if (command !== "serve") {
    config.base = "/worldwise/";
  }
  return config;
});
 */

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
  base: "/", // 确保这里设置正确
  server: {
    port: 5173,
    host: true,
  },
});
