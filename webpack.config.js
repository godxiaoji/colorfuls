const path = require('path')
const webpack = require('webpack')
const { name, version, author } = require('./package.json')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'colorfuls.js',
    library: 'Colorfuls',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode: 'production',
  plugins: [
    new webpack.BannerPlugin({
      entryOnly: true, // 是否仅在入口包中输出 banner 信息
      banner: () => {
        return `${name}.js v${version}\nCopyright 2020 ${author}`
      }
    })
  ]
}
