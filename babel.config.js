module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    [
      'component',
      {
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
