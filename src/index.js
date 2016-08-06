/**
 * @module revealer
 */

'use strict'

require('./app') // parse cli onload

/**
 * @namespace
 * @property {object} stage exposes the stage module
 * @property {function} watch exposes the watch function
 * @property {function} serve exposes the server function
 */
module.exports = {
  stage: require('./stage'),
  watch: require('./watch'),
  serve: require('./serve'),
  build: require('./build'),
}
