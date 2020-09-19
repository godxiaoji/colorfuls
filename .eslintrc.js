module.exports = {
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  extends: 'eslint:recommended',
  globals: {
    define: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    strict: 0,
    'newline-per-chained-call': 0,
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', 'never']
  }
}
