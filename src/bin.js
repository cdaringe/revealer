#!/usr/bin/env node

const app = require('./app')
const stage = require('./stage')
const serve = require('./serve')
const build = require('./build')
const start = require('./start')

stage.all() // yup. just always do it.

function go () {
  if (app.build) return build()
  if (app.serve) return serve()
  if (app.start) return start()
  app.help()
}
go()
