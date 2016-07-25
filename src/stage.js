/**
 * @module stage
 */

'use strict'

const app = require('./app')
const fs = require('fs-extra')
const cp = require('child_process')

module.exports = {
  /**
   * copies your presentation source into the reveal project lib dir
   * @returns {undefined}
   */
  presentation () {
    if (app.verbose) console.log(`copying ${app.SRC_DIR} to ${app.REVEAL_DIR}`)
    fs.copySync(app.SRC_DIR, app.REVEAL_DIR)
  },

  /**
   * prepares the reveal.js dependency for serving content.  currently, it's a
   * little naughty, as the mechanism to make it work is by:
   * - installing reveal.js devDependencies (e.g. npm install --development)
   * - copying presentation content into the reveal.js dir. this copying can
   *   be seen as dirtying the dependency state, however, is safe for most
   *   people's usage
   * @returns {undefined}
   */
  revealjs () {
    // install reveal.js dev dependencies
    if (app.verbose) console.log('preparing reveal.js package to receive presentation content')
    const installedAppPkgs = fs.readdirSync('node_modules', { cwd: app.APP_ROOT })
    fs.mkdirpSync(`${app.REVEAL_DIR}/node_modules`, { cwd: app.APP_ROOT })
    const installedRevealOnlyPkgs = fs.readdirSync(`${app.REVEAL_DIR}/node_modules`, { cwd: app.APP_ROOT })
    const installedRevealPkgs = installedAppPkgs.concat(installedRevealOnlyPkgs)
    const revealDevDeps = Object.keys(require(`${app.REVEAL_DIR}/package.json`).devDependencies)
    const installRevealDevDeps = revealDevDeps.some(reqPkg => installedRevealPkgs.indexOf(reqPkg) === -1)
    if (installRevealDevDeps) {
      if (app.verbose) console.log('installing revealjs dev dependencies')
      cp.execSync('npm install --development', { stdio: 'inherit', cwd: app.REVEAL_DIR })
    }
  },

  /**
   * stages reveal and presentation on first boot of the app/lib
   * @returns {undefined}
   */
  all () {
    this.revealjs()
    this.presentation()
  }
}
