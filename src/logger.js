'use strict'

module.exports = {
  info () {
    process.stdout.write('[revealer] ')
    console.log.apply(console.log, arguments)
  },
  verbose () {
    process.stdout.write('[revealer] ')
    console.log.apply(console.log, arguments)
  }
}
