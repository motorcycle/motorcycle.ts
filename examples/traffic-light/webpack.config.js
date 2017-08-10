const path = require('path')

module.exports = {
  entry: './src/bootstrap.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
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
    mainFields: [ 'module', 'jsnext:main', 'browser', 'main'],
    extensions: ['.ts', '.js'],
    alias: {
      '@base': path.resolve(__dirname, 'src/')
    }
  },
  output: {
    filename: 'bundle.js',
  }
 }
