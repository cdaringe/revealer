'use strict'

require('perish')
const app = require('commander')
const pkg = require('../package.json')
const path = require('path')
const fs = require('fs-extra')
let appRoot = require.main.paths[1].substr(0, require.main.paths[1].length - 'node_modules'.length)
if (path.basename(appRoot)) appRoot = process.cwd()

app
.version(pkg.version)
.option('-s', '--stage [dir]', 'create runnable presentation. takes an optional directory, defaults to project/root/staging. merges reveal.js source and your presentation content')
.option('-w, --watch [dir]', 'watch your presentation content and stage it on change (make livereload great)')
.option('-v, --verbose', 'make revealer loud again')
.option('-S, --serve', 'serve reveal.js presentation... just as reveal.js would do it! you can alternatively enter the staging directory and simply run reveal.js tasks')
.parse(process.argv)

if (typeof app.watch === 'string') {
  app.watch = path.isAbsolute(app.watch.trim()) ? app.watch : path.resolve(process.cwd(), app.watch)
} else {
  app.watch = path.join(appRoot, 'src')
  try {
    fs.lstatSync(app.watch)
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
    throw new Error([
      'no watch directory provided and default `src` dir not present. please',
      'provide a directory to `--watch [dir]` or create a `src` dir'
    ].join(' '))
  }
  if (app.verbose) console.warn('watching default src/ dir for presentation changes')
}
Object.assign(app, {
  APP_ROOT: appRoot,
  STAGING_DIR: app.stage || path.join(appRoot, 'staging'),
  SRC_DIR: app.watch,
  REVEAL_DIR: path.join(appRoot, 'node_modules', 'reveal.js')
})
module.exports = app
