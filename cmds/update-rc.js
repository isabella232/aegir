'use strict'

module.exports = {
  command: 'update-rc <branch>',
  example: 'update-rc release/v0.38.x',
  desc: 'Update a release candidate',
  builder: {
    branch: {
      describe: 'Where the latest release branch is',
      type: 'string'
    },
    remote: {
      describe: 'Which remote to use',
      type: 'string',
      default: 'origin'
    },
    distTag: {
      describe: 'The dist tag to publish the rc as',
      type: 'string',
      default: 'next'
    },
    preId: {
      describe: 'What to call the rc',
      type: 'string',
      default: 'rc'
    }
  },
  handler (argv) {
    const cmd = require('../src/update-rc')
    return cmd(argv)
  }
}
