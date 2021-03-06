'use strict'

const EPILOG = `
Presets:
\`check\`       Runs the type checker with your local config (without writing any files). . 
\`types\`       Emits type declarations for \`['src/**/*', 'package.json']\` to \`dist\` folder.
\`docs\`        Generates documentation based on type declarations to the \`docs\` folder.
\`config\`      Prints base config to stdout.

Note: 
Check out the documentation for JSDoc based TS types here: https://github.com/ipfs/aegir/blob/master/md/ts-jsdoc.md

Supports options forwarding with '--' for more info check https://www.typescriptlang.org/docs/handbook/compiler-options.html
`
module.exports = {
  command: 'ts',
  desc: 'Typescript command with presets for specific tasks.',
  builder: (yargs) => {
    yargs
      .epilog(EPILOG)
      .example('aegir ts --preset config > tsconfig.json', 'Add a base tsconfig.json to the current repo.')
      .options({
        preset: {
          type: 'string',
          choices: ['config', 'check', 'types', 'docs'],
          describe: 'Preset to run',
          alias: 'p'
        },
        include: {
          type: 'array',
          describe: 'Values are merged into the local TS config include property.',
          default: []
        }
      })
  },
  handler (argv) {
    const ts = require('../src/ts')
    return ts(argv)
  }
}
