const path = require('path');
const apiMocker = require('connect-api-mocker');

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
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.use(apiMocker('/api', 'src/api'));
    },
    proxy: {
      '/api/': { target: 'http://127.0.0.1:3000', changeOrigin: true },
    },
    compress: true,
    port: 3000,
    host: '127.0.0.1',
    historyApiFallback: true,
  },
};
