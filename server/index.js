// process.env.ENV    = 'prod'
var env            = process.env.ENV || 'dev'
var configure      = require('honeycombjs').Configure
var config         = configure(__dirname, env, true)
config.http.port   = process.env.PORT || config.http.port

var done = e => {
  console.log(e
    ? 'app  WEB fail: '.red + e.message
    : `${'app'.dim}  WEB ${'ready'.green}\t\t      `.blue + `${config.http.host}`)
}
var app = require('./app.js')({config,done})
