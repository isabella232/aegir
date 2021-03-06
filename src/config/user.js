'use strict'

const { cosmiconfigSync } = require('cosmiconfig')
const merge = require('merge-options')
const utils = require('../utils')

function normalizeHooks (hooks = {}) {
  const result = {
    browser: {
      pre: () => Promise.resolve(),
      post: () => Promise.resolve()
    },
    node: {
      pre: () => Promise.resolve(),
      post: () => Promise.resolve()
    }
  }

  if (hooks.pre && hooks.post) {
    result.browser.pre = hooks.pre
    result.browser.post = hooks.post
    result.node.pre = hooks.pre
    result.node.post = hooks.post

    return result
  }

  return merge(result, hooks)
}

function userConfig () {
  const userConfig = utils.getUserConfig()

  const user = merge(
    {
      webpack: {},
      karma: {},
      hooks: {},
      entry: utils.fromRoot('src', 'index.js'),
      bundlesize: {
        path: './dist/index.min.js',
        maxSize: '100kB'
      }
    },
    userConfig
  )

  user.hooks = normalizeHooks(user.hooks)

  return user
}

const config = () => {
  let cosmiconfig
  try {
    const configExplorer = cosmiconfigSync('aegir', {
      searchPlaces: ['package.json', '.aegir.js']
    })
    const { config } = configExplorer.search()
    cosmiconfig = config || {}
  } catch (err) {
    cosmiconfig = {}
  }
  const conf = merge({
    webpack: {},
    karma: {},
    hooks: {},
    entry: utils.fromRoot('src', 'index.js'),
    bundlesize: {
      path: './dist/index.min.js',
      maxSize: '100kB'
    }
  },
  cosmiconfig)

  return conf
}

module.exports = userConfig
userConfig.config = config
