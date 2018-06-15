'use strict'

module.exports = {
  verbose () {
    process.stdout.write('[revealer] ')
    console.log.apply(console.log, arguments)
  }
}
