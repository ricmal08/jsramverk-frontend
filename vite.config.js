import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/jsramverk-frontend/',

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-settings.js',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/main.jsx',//exckluderar dessa ur testningen
        'vite.config.js',
        'src/test-settings.js',
        'eslint.config.js',

      ],
    },
  },
})
