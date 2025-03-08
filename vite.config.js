import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Expense-Tracker/", // Change to your repo name
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // Increase limit to 1000KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor"; // Separate React-related code
            }
            if (id.includes("recharts")) {
              return "recharts-vendor"; // Separate recharts code
            }
            return "vendor"; // Split general dependencies
          }
        },
      },
    },
  },
})
