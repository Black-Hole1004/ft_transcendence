import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    preview: {
        host: true, // Allows external access
        port: 5173, // Matches the Docker setup
    },
    build: {
        outDir: 'dist', // Default output directory
    },
})