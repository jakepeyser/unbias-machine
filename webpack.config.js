const CleanWebpackPlugin = require('clean-webpack-plugin');
const commandLineArgs = require('command-line-args');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Init common paths used for configuration
const PATHS = {
  background_page: path.join(__dirname, '/src/background/'),
  dist: path.join(__dirname, '/dist'),
  images: path.join(__dirname, '/src/assets/images'),
  index_html: path.join(__dirname, '/src/assets', 'index.html'),
  options: path.join(__dirname, '/src/options/'),
  popup: path.join(__dirname, '/src/popup/'),
  source: path.join(__dirname, '/src'),
  utils: path.join(__dirname, '/src/utils')
};

// Make sure email type was specified
let devSource;
if (process.argv.some(v => v.includes('webpack-dev-server'))) {
  const args = commandLineArgs([{ name: 'type', alias: 't', type: String }]);
  if (args.type === 'options') {
    devSource = PATHS.options;
  } else if (args.type === 'popup') {
    devSource = PATHS.popup;
  } else {
    throw Error('Missing or invalid email type');
  }
}

// Standard build options for all environments
const common = {
  bail: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      utils: PATHS.utils
    }
  }
};

// Detect how npm is run and switch based on this
let config;
switch (process.env.npm_lifecycle_event) {
  case 'build': {
    config = merge(common, {
      devtool: 'cheap-module-source-map',
      entry: {
        background_page: PATHS.background_page,
        options: PATHS.options,
        popup: PATHS.popup
      },
      mode: 'production',
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
      ]
    });
    break;
  }
  case 'build:dev-options':
  case 'build:dev-popup': {
    config = merge(common, {
      devServer: {
        contentBase: devSource,
        host: 'localhost',
        hot: true
      },
      entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        devSource
      ],
      mode: 'development',
      plugins: [
        new webpack.DefinePlugin(JSON.stringify('development')),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: PATHS.index_html,
          title: 'Unbias Machine Options'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    });
    break;
  }
  default:
    throw Error('No Webpack config specified');
}

module.exports = config;
