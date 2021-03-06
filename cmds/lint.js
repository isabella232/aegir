'use strict'

module.exports = {
  command: 'lint',
  desc: 'Lint all project files',
  builder: {
    fix: {
      alias: 'f',
      type: 'boolean',
      describe: 'Automatically fix errors if possible',
      default: false
    }
  },
  handler (argv) {
    const lint = require('../src/lint')
    return lint(argv)
  }
}
