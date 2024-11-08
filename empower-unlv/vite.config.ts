import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0", // This allows the server to be accessible on any network interface
    port: 5173, // Optional: You can change the port if needed
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        define: {
          global: {},
        },
      }
    : {}),
  resolve: {
    alias: {
      ...(process.env.NODE_ENV !== "development"
        ? {
            "./runtimeConfig": "./runtimeConfig.browser", //fix production build
          }
        : {}),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});
