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
.option('-s', '--src [dir]', 'path to your presentation content. defaults to `src/`')
.option('-b, --build [dir]', 'build your presentation and migrate all assets to `dir`. defaulds to `build/`')
.option('-w, --watch', 'watch your presentation content and stage it on change (make livereload great)')
.option('-v, --verbose', 'make revealer loud again')
.option('-S, --serve', 'serve reveal.js presentation... just as reveal.js would do it! you can alternatively enter the staging directory and simply run reveal.js tasks')
.parse(process.argv)


if (typeof app.src === 'string') {
  app.src = path.isAbsolute(app.src.trim()) ? app.src.trim() : path.resolve(appRoot, app.src)
} else {
  app.src = path.join(appRoot, 'src')
}


if (typeof app.build === 'string') {
  app.build = path.isAbsolute(app.build.trim()) ? app.build.trim() : path.resolve(appRoot, app.build)
} else {
  app.build = path.join(appRoot, 'build')
}

try {
  fs.lstatSync(app.src)
} catch (err) {
  if (err.code !== 'ENOENT') throw err
  throw new Error([
    'no watch directory provided and default `src` dir not present. please',
    'provide a directory to `--watch [dir]` or create a `src` dir'
  ].join(' '))
}

Object.assign(app, {
  APP_ROOT: appRoot,
  BUILD_DIR: app.build,
  SRC_DIR: app.src,
  REVEAL_DIR: path.join(appRoot, 'node_modules', 'reveal.js')
})

module.exports = app
