import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
/* export default defineConfig({
  // base: "/worldwise/",
  plugins: [react()],
}); */

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
  };
  if (command !== "serve") {
    config.base = "/worldwise/";
  }
  return config;
});
