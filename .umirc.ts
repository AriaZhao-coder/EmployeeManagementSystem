import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  npmClient: 'pnpm',
  alias: {
    utils: resolve(__dirname, './src/utils'),
  },
});
