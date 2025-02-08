import { defineConfig } from '@umijs/max';
import { resolve } from 'path';

export default defineConfig({
  model: {},
  npmClient: 'pnpm',
  alias: {
    utils: resolve(__dirname, './src/utils'),
    components: resolve(__dirname, './src/components'),
  },
  fastRefresh: true,
});

