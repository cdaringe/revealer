#!/usr/bin/env node

const app = require('./app')
const stage = require('./stage')
const watch = require('./watch')
const serve = require('./serve')
const build = require('./build')

stage.all() // yup. just always do it.
if (app.watch) {
  if (app.verbose) console.warn(`watching ${app.SRC_DIR} for presentation changes`)
  watch()
}
if (app.build) build()
if (app.serve) {
  if (!app.watch) console.warn('you are not watching for presentation changes (--watch). changed content will not be deployed automatically')
  serve()
}
