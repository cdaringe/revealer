const fs = require('fs-extra')
const app = require('./app')
const path = require('path')
const serve = require('./serve')
const cp = require('child_process')
const stage = require('./stage')
const logger = require('./logger')

module.exports = function start () {
  const seedFilename = path.join(app.SRC_DIR, 'index.html')
  if (!fs.existsSync('./package.json')) {
    logger.info('bootstrapping workspace')
    cp.execSync('npm init -y')
    logger.info('installing reveal.js & revealer')
    cp.execSync('npm install -D reveal.js revealer')
  } else if (!fs.existsSync('./node_modules')) {
    logger.info('ensuring reveal.js & revealer installed')
    cp.execSync('npm install -D reveal.js revealer')
  }
  if (!fs.existsSync(seedFilename)) {
    fs.mkdirpSync(path.dirname(seedFilename))
    fs.copyFileSync(path.join(app.REVEAL_DIR, 'index.html'), seedFilename)
  }
  stage.all()
  serve()
}
