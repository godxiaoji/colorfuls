const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'colorful.js',
    library: 'colorful',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode: 'production'
}
