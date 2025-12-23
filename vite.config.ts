import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(),tailwindcss()],
  server: {
  hmr: {
    overlay: true,
  }
}
,
  resolve: {
    alias: {
      "public": path.resolve(__dirname,"public/icons"),
      "icons": path.resolve(__dirname,"public/"),
      "hooks": path.resolve(__dirname, "src/hooks"),
      "assets": path.resolve(__dirname, "src/assets"),
      "components": path.resolve(__dirname, "src/components"),
      "ErrorBoundary": path.resolve(__dirname, "src/ErrorBoundary"),
      "guards": path.resolve(__dirname, "src/guards"),
      "helpers": path.resolve(__dirname, "src/helpers"),
      "libs": path.resolve(__dirname, "src/libs"),
      "pages": path.resolve(__dirname, "src/pages"),
      "routes": path.resolve(__dirname, "src/routes"),
      "store": path.resolve(__dirname, "src/store"),
      "styles": path.resolve(__dirname, "src/styles"),
    },
  },
})
