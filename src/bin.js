#!/usr/bin/env node

const app = require('./app')
const stage = require('./stage')
const serve = require('./serve')
const build = require('./build')
const start = require('./start')

function go () {
  if (app.start) return start()
  stage.all() // yup. just always do it.
  if (app.build) return build()
  if (app.serve) return serve()
  app.help()
}
go()
