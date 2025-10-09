const baseConfig = require('../config/eslint-config/base')

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...(baseConfig.parserOptions || {}),
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
