/**
 * @module revealer
 */

'use strict'

require('./app') // parse cli onload

/**
 * @namespace
 * @property {object} stage exposes the stage module
 * @property {function} serve exposes the server function
 * @property {function} build builds the presentation into the build dir. statically servable site.
 */
module.exports = {
  stage: require('./stage'),
  serve: require('./serve'),
  build: require('./build')
}
