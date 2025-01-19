import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  npmClient: 'pnpm',
  alias: {
    // '@': resolve(__dirname, './src'),   // 设置 '@' 为 src 文件夹的别名
    // '@assets': resolve(__dirname, './src/assets'), // 你可以设置多个别名
    // '@components': resolve(__dirname, './src/components'),
    utils: resolve(__dirname, './src/utils'),
  },
});
