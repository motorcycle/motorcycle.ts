const path = require('path')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const srcPath = path.join(__dirname, 'src')
const HtmlOptions = {
  filename: `index.html`,
  inject: `body`,
  template: path.join(srcPath, 'index.ejs'),
}
const entry = path.join(srcPath, 'bootstrap.ts')

module.exports = {
  entry,
  plugins: [
    new HtmlWebpackPlugin(HtmlOptions),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'thread-loader',
            options: {
              // There should be 1 CPU for the fork-ts-checker-webpack-plugin
              workers: os.cpus().length - 1,
            },
          },
          {
            loader: '@motorcycle/loader',
            options: {
              entries: [
                entry
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // IMPORTANT! Use happyPackMode to speed-up compilation and
              // reduce errors reported to webpack.
              happyPackMode: true,
            },
          },
        ],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 8080
  },
  resolve: {
    mainFields: ['module', 'jsnext:main', 'browser', 'main'],
    extensions: ['.ts', '.js'],
    alias: {
      '@base': path.resolve(__dirname, 'src/')
    }
  },
  output: {
    filename: 'bundle.js'
  }
}
