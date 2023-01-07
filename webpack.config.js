const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
    extensions: ['.js', '.jsx', '.css'],
  },
  mode: 'none',
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    client: {
      overlay: true,
    },
    compress: true,
    port: 3000,
    host: 'localhost',
  },
};
