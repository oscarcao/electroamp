const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
    { from: './src/assets/sampler', to: 'sampler' },
    { from: './src/assets/skins', to: 'skins' },
    { from: './src/assets/icons', to: 'icons' },
  ]}),
];
