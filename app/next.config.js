const _assignIn = require('lodash/assignIn');
const withCSS = require('@zeit/next-css');
module.exports = _assignIn({}, withCSS(), {
  distDir: 'build',
});
