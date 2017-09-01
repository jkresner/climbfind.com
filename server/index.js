// process.env.ENV    = 'prod'
var env            = process.env.ENV || 'dev'
var configure      = require('honeycombjs').Configure
var config         = configure(__dirname, env, true)


var done = e => {
  console.log(e
  ? 'app  WEB fail: '.red + e.message
  : 'app  WEB ready\t\t      '.green + `${honey.cfg('http.host')}`)
}
var app = require('./app.js')({config,done})
