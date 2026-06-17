import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(async ({ mode }) => {
  const ENV = loadEnv(mode, process.cwd())

  const plugins = [vue()]

  if (ENV.VITE_VISUALIZER_ENABLED === 'true') {
    const { visualizer } = await import('rollup-plugin-visualizer')
    plugins.push(visualizer({ gzipSize: true, emitFile: true, filename: 'stats.html' }))
  }

  if (ENV.VITE_IMAGEMIN_ENABLED === 'true') {
    const viteImagemin = (await import('@vheemstra/vite-plugin-imagemin')).default
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default
    const imageminPngquant = (await import('imagemin-pngquant')).default

    const opts = {
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngquant(),
      },
    }

    if (ENV.VITE_MINIFIER_WEBP === 'true') {
      const imageminWebp = (await import('imagemin-webp')).default
      opts.makeWebp = { plugins: { png: imageminWebp() } }
    }

    plugins.push(viteImagemin(opts))
  }

  return {
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: ENV.VITE_PROXY_TARGET,
          changeOrigin: true,
        },
      },
    },
    build: {
      assetsInlineLimit: 204800,
    },
    plugins,
  }
})
