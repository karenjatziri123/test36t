const path = require('path');

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/@react-aria\/ssr/, // Excluye el módulo problemático
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs'], // Añade otras extensiones según sea necesario
  },
  devtool: 'source-map', // Opcional: Define el tipo de source map que deseas usar
};

