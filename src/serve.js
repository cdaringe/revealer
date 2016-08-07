/**
 * serves presentations through the standard reveal.js mechanism.
 * at the time of writing, that is running `grunt serve` in a non-production
 * install of reveal.js, from the reveal.js root.  serve hotreloads the site
 * when content changes
 * @module serve
 */

'use strict'

const cp = require('child_process')
const app = require('./app')
const watch = require('./watch')
const logger = require('./logger')

module.exports = () => {
  watch()
  if (app.verbose) logger.verbose('serving presentation via reveal.js')
  const server = cp.spawn('grunt', ['serve'], { stdio: 'inherit', cwd: app.REVEAL_DIR })
  server.on('error', (err) => { throw err })

  const cleanExit = (code) => {
    if (app.verbose) logger.verbose('exiting serve process')
    try { server.kill('SIGINT') } catch (err) { /* pass */ }
    process.exit(code)
  }
  process.on('SIGINT', cleanExit) // catch ctrl-c
  process.on('SIGTERM', cleanExit) // catch kill
  process.on('exit', cleanExit)
}
