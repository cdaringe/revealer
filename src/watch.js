/**
 * watches your presentation source, then, onchange, copies it to the reveal.js
 * serve path, where it can be served manually or hotreloaded (see serve module)
 * @module watch
 */

'use strict'

const app = require('./app')
const chokidar = require('chokidar')
const fs = require('fs')
const stage = require('./stage')

module.exports = () => {
  let dirStat
  try {
    dirStat = fs.lstatSync(app.SRC_DIR)
  } catch (err) {
    console.error(`unable to watch directory: ${app.SRC_DIR || 'no directory specified to --watch'}`)
    throw err
  }
  if (!dirStat.isDirectory()) throw new Error(`--watch [dir] passed an invalid directory: ${app.SRC_DIR}`)
  chokidar.watch(app.SRC_DIR)
  .on('change', (event, path) => {
    console.log('presentation change detected... updating reveal.js source')
    stage.presentation()
  })
}
