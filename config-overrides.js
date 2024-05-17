// config-overrides.js
const { override } = require('customize-cra');

module.exports = override((config) => {
  config.module.rules.push({
    test: /\.mjs$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: /node_modules\/@react-aria\/ssr/, // Excluir el módulo problemático
  });
  return config;
});
