'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE: prodEnv.FIREBASE,
  ALGOLIA: prodEnv.ALGOLIA
})
