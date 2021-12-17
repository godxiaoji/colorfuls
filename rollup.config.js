import { DEFAULT_EXTENSIONS } from '@babel/core'
import typescript from 'rollup-plugin-typescript2'
import { babel } from '@rollup/plugin-babel'

export default [
  {
    input: './src/index.ts',
    output: {
      name: 'Colorfuls',
      format: 'umd',
      file: 'lib/index.js'
      // exports: 'named'
    },
    plugins: [
      typescript({}),
      babel({
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
        babelHelpers: 'bundled'
      })
    ]
  },
  {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      file: 'lib/index.cjs.js',
      exports: 'default'
    },
    plugins: [typescript({})]
  },
  {
    input: './src/index.ts',
    output: {
      format: 'esm',
      file: 'lib/index.esm.js'
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: { declaration: true }
        }
      })
    ]
  }
]
