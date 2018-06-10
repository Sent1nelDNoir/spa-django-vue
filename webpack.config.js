let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: [ './assets/js/app.js', './assets/sass/app.scss'],
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: 'static/',
    filename: 'js/app.js',
    chunkFilename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          //'vue-style-loader',
          'css-loader'
        ]),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          //'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]),
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract([
          //'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ]),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
          extractCSS: true,
          loaders: {
            'scss': ExtractTextPlugin.extract([
              //'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]),
            'sass': ExtractTextPlugin.extract([
              //'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]),
          },


          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: ['env', 'es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '~': path.join(__dirname, './assets/js'),
    },
    extensions: ['.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({ clearConsole: true}),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
    }),
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
  ])
}
