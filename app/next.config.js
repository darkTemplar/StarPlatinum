const webpack = require('webpack');
const _assignIn = require('lodash/assignIn');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = withImages(
  withCSS({
    distDir: 'build',
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));

      return config;
    },
    assetPrefix: isProd ? process.env.NODE_ENV.CLOUDFRONT_DOMAIN_NAME : '',
  })
);
