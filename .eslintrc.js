module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
