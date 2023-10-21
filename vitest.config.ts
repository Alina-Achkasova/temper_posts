import { defineConfig } from "vitest/config";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({})
  ],
  test: {
    environment: 'jsdom',
    coverage: {
      reportsDirectory: 'tests/unit/coverage',
      reporter: ['text', 'json', 'html'],
      provider: 'istanbul',
    }
  }
})