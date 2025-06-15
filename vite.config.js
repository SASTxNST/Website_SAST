import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import cesium from "vite-plugin-cesium";
export default defineConfig({
  plugins: [tailwindcss(), cesium()],
  server: {
    allowedHosts: ["691c-2a09-bac5-3b51-1a46-00-29e-d.ngrok-free.app"],
  },
});
