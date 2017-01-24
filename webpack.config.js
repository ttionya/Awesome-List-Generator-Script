const PATH = require('path'),
    Webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production',
    ROOT_PATH = PATH.join(__dirname),                         // ./
    RES_PATH = PATH.join(ROOT_PATH, 'resources'),             // ./resources
    OUTPUT_PATH = PATH.join(ROOT_PATH, PROD ? 'tmp' : 'dev'); // ./tmp OR ./dev


module.exports = {
  devtool: PROD ? false : '#cheap-module-eval-source-map',


  entry: {
    main: PATH.join(RES_PATH, 'main.js') // ./resources/main.js
  },


  output: {
    path: OUTPUT_PATH,
    // publicPath: '/',
    filename: 'Awesome-List-Generator.js'
  },


  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.common.js'
    },

    extensions: [
      '.vue',
      '.js'
    ],

    modules: [
      PATH.resolve('node_modules')
    ]
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallbackLoader: 'vue-style-loader',
              loader: [
                'css-loader',
                'postcss-loader'
              ]
            }),
            scss: ExtractTextPlugin.extract({
              fallbackLoader: 'vue-style-loader',
              loader: [
                'css-loader',
                'postcss-loader',
                'sass-loader'
              ]
            }),
          }
        }
      },

      // Write all style in vue file
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallbackLoader: "style-loader",
      //     loader: [
      //       'css-loader',
      //       'postcss-loader'
      //     ]
      //   })
      // },
      //
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallbackLoader: 'style-loader',
      //     loader: [
      //       'css-loader',
      //       'postcss-loader',
      //       'sass-loader'
      //     ]
      //   })
      // },

      // Inherit Github font
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 8192000
      //   }
      // },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 8192000000
        }
      }
    ]
  },


  plugins: [

    // Webpack-Dev-Server
    new Webpack.HotModuleReplacementPlugin(),

    // Clean Folders
    new CleanWebpackPlugin([
      PATH.join(ROOT_PATH, 'tmp'),
      PATH.join(ROOT_PATH, 'dev/*.js'),
      PATH.join(ROOT_PATH, 'dev/*.css')
    ], {
      // root: './',
      // verbose: false,
      // dry: false,
      // exclude: []
    }),

    // Loader Options
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        postcss: [
          require('autoprefixer')({
            // https://github.com/postcss/autoprefixer
            browsers: ['> 5%']
          })
        ]
      }
    }),

    // CSS
    new ExtractTextPlugin({
      filename: 'Awesome-List-Generator.css',
      disable: false,
      allChunks: true
    }),

    // Uglify
    PROD ?
        new Webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
        : () => {}
  ],


  // Hidden WARNING
  performance: {
    hints: false
  },


  externals: {
    vue: 'window.Vue'
  },


  devServer: {
    // https://webpack.github.io/docs/webpack-dev-server.html#inline-mode-with-node-js-api
    host: '192.168.1.54',
    port: '8080',
    contentBase: './dev',
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
};