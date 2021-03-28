import { UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default (): UserConfigExport => {
  return {
    plugins: [vue()],
  };
};
