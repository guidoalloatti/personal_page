import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'

function getGitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch (_) {
    return 'unknown'
  }
}

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __BUILD_HASH__: JSON.stringify(getGitHash()),
    __BUILD_VERSION__: JSON.stringify(pkg.version),
  },
})
