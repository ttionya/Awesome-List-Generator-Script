const PATH = require('path'),
    Webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production',
    RES_PATH = PATH.join(__dirname, 'resources'),
    PUB_PATH = PATH.join(__dirname);


module.exports = {
  devtool: PROD ? false : '#cheap-module-eval-source-map',


  entry: {
    main: PATH.join(RES_PATH, 'main.js') // ./resources/main.js
  },


  output: {
    path: PUB_PATH,
    // publicPath: '/',
    filename: 'Awesome-List-Generator.tmp.js'
  },


  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
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

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: [
            'css-loader',
            'postcss-loader'
          ]
        })
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      },

      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 8192,
      //     name: 'fonts/[name].[ext]'
      //   }
      // },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 8192000
        }
      }
    ]
  },


  plugins: [

    // loader options
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        postcss: [
          require('autoprefixer')({
            // https://github.com/postcss/autoprefixer
            remove: false,
            browsers: ['> 5%']
          })
        ]
      }
    }),

    // CSS
    new ExtractTextPlugin({
      filename: 'Awesome-List-Generator.tmp.css',
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


  // hidden WARNING
  performance: {
    hints: false
  },


  externals: {
    vue: 'vue'
  }
};