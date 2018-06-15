const fs = require('fs-extra')
const app = require('./app')
const path = require('path')
const serve = require('./serve')

module.exports = function start () {
  const seedFilename = path.join(app.SRC_DIR, 'index.html')
  if (!fs.existsSync(seedFilename)) {
    fs.mkdirpSync(path.dirname(seedFilename))
    fs.copyFileSync(path.join(app.REVEAL_DIR, 'index.html'), seedFilename)
  }
  serve()
}
