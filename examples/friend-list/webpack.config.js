const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, 'src')

const HtmlOptions = {
  filename: `index.html`,
  inject: `body`,
  template: path.join(srcPath, 'index.ejs'),
}

module.exports = {
  entry: './src/bootstrap.ts',
  plugins: [new HtmlWebpackPlugin(HtmlOptions)],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['@motorcycle/loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        use: ['css-loader'],
        exclude: /node_modules/,
      }
    ],
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 8080,
  },
  resolve: {
    mainFields: ['module', 'jsnext:main', 'browser', 'main'],
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
  },
}
