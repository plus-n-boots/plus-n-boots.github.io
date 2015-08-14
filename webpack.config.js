var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    popup: './src/popup/popup'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', 'jsx', '.css']
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
    { test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  node: {
    dns: 'mock',
    net: 'mock'
  }
};
