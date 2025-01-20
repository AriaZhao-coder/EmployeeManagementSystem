import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  npmClient: 'pnpm',
  alias: {
    utils: resolve(__dirname, './src/utils'),
  },

  fastRefresh: true,  // 设置为布尔值 true 或 false
});

