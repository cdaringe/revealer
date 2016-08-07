#!/usr/bin/env node

const app = require('./app')
const stage = require('./stage')
const serve = require('./serve')
const build = require('./build')

stage.all() // yup. just always do it.
debugger
if (app.build) build()
if (app.serve) serve()
