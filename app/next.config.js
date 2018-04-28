const webpack = require('webpack');
const _assignIn = require('lodash/assignIn');
const withCSS = require('@zeit/next-css');

require('dotenv').config();

module.exports = withCSS({
  distDir: 'build',
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));

    return config;
  },
});
