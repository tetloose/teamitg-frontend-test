import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react-swc'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      viteTsconfigPaths({ root: __dirname, ignoreConfigErrors: true }),
      svgr()
    ],
    build: {
      manifest: true,
      sourcemap: mode === 'development',
      outDir: resolve(__dirname, 'build')
    },
    resolve: {
      alias: {
        '@context': resolve(__dirname, 'src/context'),
        '@atoms': resolve(__dirname, 'src/atoms'),
        '@molecules': resolve(__dirname, 'src/molecules'),
        '@components': resolve(__dirname, 'src/components'),
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@crud': resolve(__dirname, 'src/crud'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@global': resolve(__dirname, 'src/global'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@images': resolve(__dirname, 'src/images'),
        '@routes': resolve(__dirname, 'src/routes'),
        '@pages': resolve(__dirname, 'src/pages')
      }
    },
    test: {
      globals: true,
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'jsdom',
            setupFiles: ['.vitest/vitest.setup.ts'],
            include: ['./src/**/*.test.{ts,tsx}'],
            exclude: [
              '.git',
              '.husky',
              '.scripts',
              '.vscode',
              'node_modules',
              'public',
              'build',
              'storybook-static',
              'coverage'
            ]
          }
        },
        {
          extends: true,
          plugins: [storybookTest({ configDir: '.storybook' })],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [{ browser: 'chromium' }]
            }
          }
        }
      ]
    },
    server: {
      port: 3000
    }
  }
})
