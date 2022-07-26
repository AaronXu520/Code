import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  fastRefresh: {},
  dva: {
    skipModelValidate: true,
  },
});
