import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // se a 5173 estiver ocupada, dá erro (não troca de porta)
    host: "localhost",
    open: false
  }
});
