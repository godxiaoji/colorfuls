import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'umd',
      name: 'Colorfuls',
      file: 'build/colorfuls.js',
      indent: '\t'
    },
    {
      format: 'es',
      name: 'Colorfuls',
      file: 'build/colorfuls.esm.js',
      indent: '\t'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}
