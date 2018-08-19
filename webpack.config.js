const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// Init common paths used for configuration
const PATHS = {
  background_page: path.join(__dirname, '/src/background/'),
  dist: path.join(__dirname, '/dist'),
  images: path.join(__dirname, '/src/assets/images'),
  index_html: path.join(__dirname, '/src/assets', 'index.html'),
  options: path.join(__dirname, '/src/options/'),
  popup: path.join(__dirname, '/src/popup/'),
  source: path.join(__dirname, '/src'),
  utils: path.join(__dirname, '/utils')
};

// Standard build options for all environments
module.exports = {
  bail: true,
  devtool: 'cheap-module-source-map',
  entry: {
    background_page: PATHS.background_page,
    options: PATHS.options,
    popup: PATHS.popup
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: 'development',
  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.dist], { verbose: false }),
    new CopyWebpackPlugin([
      { from: 'manifest.json', to: PATHS.dist },
      { from: PATHS.images, to: `${PATHS.dist}/images` }
    ]),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      template: PATHS.index_html,
      title: 'Unbias Machine Options'
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
      template: PATHS.index_html,
      title: 'Popup'
    }),
    new webpack.DefinePlugin(JSON.stringify('production'))
  ],
  resolve: {
    modules: [PATHS.source, 'node_modules'],
    alias: {
      utils: PATHS.utils
    }
  }
};
