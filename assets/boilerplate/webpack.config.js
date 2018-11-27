const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: 'main'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js?[hash:8]',
    publicPath: "/"
  },
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve('src'),
    ],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        include: path.resolve('src')
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/img'),
        to: 'img',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/css'),
        to: 'css',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/js'),
        to: 'js',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/vendor'),
        to: 'vendor',
      },
    ]),
  ]
};

module.exports = config;
