const baseConfig = require('./base')

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: [...new Set([...(baseConfig.plugins || []), 'react', 'react-hooks'])],
  settings: {
    ...(baseConfig.settings || {}),
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...(baseConfig.rules || {}),
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
}
