import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate PDF-related dependencies into their own chunk
          'pdf-renderer': ['@react-pdf/renderer'],
          i18n: ['next-intl'],
          // Separate validation dependencies
          validation: ['ajv', 'ajv-formats', '@jsonresume/schema'],
          // Separate large UI dependencies
          'ui-radix': [
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
          ],
          // Separate utility libraries
          utilities: ['culori', 'clsx', 'class-variance-authority', 'tailwind-merge'],
        },
      },
    },
  },
})
