// process.env.ENV    = 'prod'
var env            = process.env.ENV || 'dev'
var configure      = require('honeycombjs').Configure
var config         = configure(__dirname, env, true)
config.http.port   = process.env.PORT || config.http.port


var done = e => console.log(e
  ? 'app  WEB failed: '.red + e.message
  : 'app  WEB ready @ '.green + `${honey.cfg('http.host')}`)


var app = require('./app.js')({config,done})
