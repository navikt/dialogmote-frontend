import path from 'path'

import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

dotenv.config({
  path: '.env.test',
})

const localStorageFilePath = '/tmp/vitest-localstorage'
const nodeOptions = (process.env.NODE_OPTIONS ?? '')
  .split(/\s+/)
  .filter(Boolean)
  .filter((option) => !option.startsWith('--localstorage-file'))
  .concat(`--localstorage-file=${localStorageFilePath}`)
  .join(' ')

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    environmentOptions: {
      url: 'http://localhost',
    },
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test/vitest.setup.mts'],
    env: {
      NODE_OPTIONS: nodeOptions,
    },
    clearMocks: true,
    deps: {
      optimizer: {
        client: {
          include: ['vitest-canvas-mock']
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
