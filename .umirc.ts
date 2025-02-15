import { defineConfig } from '@umijs/max';
import { resolve } from 'path';
import * as process from "node:process";

export default defineConfig({
  model: {},
  npmClient: 'pnpm',
  alias: {
    utils: resolve(__dirname, './src/utils'),
    components: resolve(__dirname, './src/components'),
  },
  fastRefresh: true,
  hash: true,
  history: {
    type: 'browser',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  base: '/'
});

