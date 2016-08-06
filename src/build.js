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
const fs = require('fs-extra')

module.exports = () => {
  if (app.verbose) console.log('building presentation via reveal.js')
  const server = cp.spawn('grunt', ['css', 'uglify'], { stdio: 'inherit', cwd: app.REVEAL_DIR })
  server.on('error', (err) => { throw err })

  const cleanExit = (code) => {
    if (app.verbose) console.log('exiting build process')
    try { server.kill('SIGINT') } catch (err) { /* pass */ }
    process.exit(code)
  }

  const copyBuilt = (code) => {
    if (code) return cleanExit(code)

    fs.removeSync(app.BUILD_DIR)
    fs.mkdirpSync(app.BUILD_DIR, { cwd: app.APP_ROOT })
    const toCopy = [ 'css', 'js', 'lib', 'plugin' ]
    toCopy.forEach((dir) => fs.copySync(`${app.REVEAL_DIR}/${dir}`, `${app.BUILD_DIR}/${dir}`))
    fs.copySync(app.SRC_DIR, app.BUILD_DIR)
    return cleanExit(code)
  }

  process.on('SIGINT', cleanExit) // catch ctrl-c
  process.on('SIGTERM', cleanExit) // catch kill
  process.on('exit', copyBuilt)
}
