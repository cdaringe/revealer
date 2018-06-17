'use strict'

require('perish')
const app = require('commander')
const pkg = require('../package.json')
const path = require('path')
const fs = require('fs-extra')
const logger = require('./logger')
const os = require('os')

let appRoot = require.main.paths[1].substr(
  0,
  require.main.paths[1].length - 'node_modules'.length
)
if (path.basename(appRoot)) appRoot = process.cwd()

app
  .version(pkg.version)
  .option('--start', 'create and empty presentation if not found, then --serve')
  .option(
    '-S, --serve',
    'serve reveal.js presentation... just as reveal.js would do it! you can alternatively enter the staging directory and simply run reveal.js tasks'
  )
  .option(
    '-s, --source [dir]',
    'path to your presentation content. defaults to `src/`'
  )
  .option(
    '-b, --build [dir]',
    'build your presentation and migrate all assets to `dir`. defaults to `build/`'
  )
  .option('-v, --verbose', 'make revealer loud again')
  .parse(process.argv)

// fully qualify source path always
if (typeof app.src === 'string') {
  app.src = path.isAbsolute(app.src.trim())
    ? app.src.trim()
    : path.resolve(appRoot, app.src)
} else {
  app.src = path.join(appRoot, 'src')
}

// fully qualify build path if we are building
if (app.build) {
  if (typeof app.build === 'string') {
    app.build = path.isAbsolute(app.build.trim())
      ? app.build.trim()
      : path.resolve(appRoot, app.build)
  } else {
    app.build = path.join(appRoot, 'build')
  }
}

// assert source path valid
if (!app.start) {
  try {
    fs.lstatSync(app.src)
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
    throw new Error(
      [
        'no source directory provided and default `src` dir not present. please',
        'provide a directory to `--source [dir]` or create a `src` dir'
      ].join(' ')
    )
  }
}

// prep app constants
const CONSTANTS = {
  APP_ROOT: appRoot,
  BUILD_DIR: app.build,
  SRC_DIR: app.src,
  REVEAL_DIR: path.join(appRoot, 'node_modules', 'reveal.js'),
  IS_WIN: /^win/.test(os.platform())
}
Object.assign(app, CONSTANTS)
if (app.verbose) logger.verbose(CONSTANTS)

module.exports = app
