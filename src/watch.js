/**
 * watches your presentation source, then, onchange, copies it to the reveal.js
 * serve path, where it can be served manually or hotreloaded (see serve module).
 * internal api used by `serve`
 * @module watch
 * @private
 */

'use strict'

const app = require('./app')
const chokidar = require('chokidar')
const fs = require('fs')
const stage = require('./stage')
const logger = require('./logger')

module.exports = () => {
  chokidar.watch(app.SRC_DIR)
  .on('change', (path) => {
    if (app.verbose) logger.verbose(`file ${path} change detected... updating reveal.js source`)
    stage.presentation()
  })
}
