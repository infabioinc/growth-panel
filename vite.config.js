import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use the CJS bundle of lucide-react to avoid uncompiled JSX in the package
  resolve: {
    alias: {
      'lucide-react': 'lucide-react/dist/cjs/lucide-react.js'
    }
  },
  // Ensure the React plugin also transforms JSX inside lucide-react package for dev
  plugins: [
    react({
      include: ["src/**/*.{js,jsx,ts,tsx}", "node_modules/lucide-react/**/*.{js,jsx,ts,tsx}"]
    })
  ],
})

