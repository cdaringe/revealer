/**
 * serves presentations through the standard reveal.js mechanism.
 * at the time of writing, that is running `grunt serve` in a non-production
 * install of reveal.js, from the reveal.js root.  serve hotreloads the site
 * when content changes
 * @module build
 */

'use strict'

const cp = require('child_process')
const app = require('./app')
const fs = require('fs-extra')
const logger = require('./logger')

module.exports = buildDir => {
  buildDir = buildDir || app.BUILD_DIR
  if (app.verbose) {
    logger.verbose(`building presentation via reveal.js to: ${buildDir}`)
    logger.verbose(`running \`grunt css uglify\` from  ${app.REVEAL_DIR}`)
  }
  const gruntPathRelative = `node_modules/.bin/grunt${app.IS_WIN ? '.cmd' : ''}`
  cp.execSync(`${gruntPathRelative} css uglify`, { cwd: app.REVEAL_DIR })
  fs.removeSync(buildDir)
  fs.mkdirpSync(buildDir, { cwd: app.APP_ROOT })
  const toCopy = ['css', 'js', 'lib', 'plugin']
  toCopy.forEach(dir =>
    fs.copySync(`${app.REVEAL_DIR}/${dir}`, `${buildDir}/${dir}`)
  )
  fs.copySync(app.SRC_DIR, buildDir)
  logger.verbose('build complete.')
}
