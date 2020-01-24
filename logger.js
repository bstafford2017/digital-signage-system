const moment = require('moment')
const fs = require('fs')
const path = require('path')

// Middleware function
const logger = (req, res, next) => {
  const content = `[${req.method}] ${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
  const targetPath = path.join('./logs', 'log.txt')
  // Save to log file
  if(fs.existsSync(targetPath)){
    fs.appendFile(targetPath, content + '\n', (err) => {if(err) throw err})
  } else {
    fs.writeFile(targetPath, content, (err) => {if(err) throw err})
  }
  next()
}

module.exports = logger