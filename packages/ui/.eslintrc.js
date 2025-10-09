const reactConfig = require('../config/eslint-config/react')

module.exports = {
  ...reactConfig,
  parserOptions: {
    ...(reactConfig.parserOptions || {}),
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    ...(reactConfig.rules || {}),
    'react/jsx-props-no-spreading': 'off',
  },
}
