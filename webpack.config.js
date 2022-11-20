const path = require('path');
const os = require('os');
var glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const htmlFilesPaths = glob.sync('./src/**/*.html');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  target: ['web', 'es5'],
  entry: {
    bundle: ['./src/js/index.js', './src/css/style.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `./js/[name]${isProd ? '.min' : ''}.js`,
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `./css/[name]${isProd ? '.min' : ''}.css`
    }),
    ...htmlFilesPaths.map(file => {
      return new HtmlWebpackPlugin({
        template: file,
        inject: 'body',
        filename: file.split('/').slice(2).join('/')
      });
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          // Extract CSS
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new CssMinimizerPlugin({
        include: /\.min\.css/,
        parallel: os.cpus().length,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      }),
      new TerserPlugin({
        include: /\.min\.js/,
        parallel: os.cpus().length,
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    watchFiles: ['./src/**/*'],
    open: true,
    hot: true
  },
  stats: {
    preset: 'minimal',
    warnings: true,
    publicPath: true
  },
  cache: true
};

