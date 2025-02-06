import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  plugins: ['@umijs/plugins/dist/model'],
  npmClient: 'pnpm',
  alias: {
    utils: resolve(__dirname, './src/utils'),
    components: resolve(__dirname, './src/components'),
  },
  fastRefresh: true,  // 设置为布尔值 true 或 false
});

