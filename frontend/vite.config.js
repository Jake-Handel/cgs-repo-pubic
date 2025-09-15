import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [vue()],
    define: {
      'process.env': { ...process.env, ...env },
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.PROD': mode === 'production',
      'import.meta.env.DEV': mode === 'development',
    },
    server: {
      cors: {
        origin: ['http://localhost:8080'],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        credentials: true
      },
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Content-Security-Policy': "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' https:; " +
          "style-src 'self' 'unsafe-inline' https:; " +
          "font-src 'self' https: data:; " +
          "img-src 'self' data: https:; " +
          "connect-src 'self' https:"
      }
    },
    build: {
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'aos', 'dompurify'],
            fontawesome: ['@fortawesome/fontawesome-svg-core', '@fortawesome/vue-fontawesome']
          }
        }
      }
    }
  });
};
