import { UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default (): UserConfigExport => {
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: 'http://106.52.32.186:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
};
