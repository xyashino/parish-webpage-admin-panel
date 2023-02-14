import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./src/assets"),
      "@icons": resolve(__dirname, "./src/components/icons"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@data": resolve(__dirname, "./src/data/"),
      "@components": resolve(__dirname, "./src/components"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@context": resolve(__dirname, "./src/context"),
      "@enums": resolve(__dirname, "./src/enums"),
      "@hooks": resolve(__dirname, "./src/hooks"),
    },
  },
  plugins: [react()],
});
