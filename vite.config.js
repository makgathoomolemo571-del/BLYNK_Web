import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({

  plugins: [
    react()
  ],
build: {
    chunkSizeWarningLimit: 1000
  },
  resolve: {

    alias: {

      "@": path.resolve(__dirname, "./src"),

      "@app": path.resolve(__dirname, "./src/app"),

      "@assets": path.resolve(__dirname, "./src/assets"),

      "@config": path.resolve(__dirname, "./src/config"),

      "@layouts": path.resolve(__dirname, "./src/layouts"),

      "@shared": path.resolve(__dirname, "./src/shared"),

      "@modules": path.resolve(__dirname, "./src/modules"),

      "@pages": path.resolve(__dirname, "./src/pages"),

      "@styles": path.resolve(__dirname, "./src/styles")

    }

  },

  server: {

    port: 5173,

    open: true

  },

  preview: {

    port: 4173

  }

});