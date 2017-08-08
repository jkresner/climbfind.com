// process.env.ENV    = 'prod'
var env            = process.env.ENV || 'dev'
var configure      = require('honeycombjs').Configure
var config         = configure(__dirname, env, true)


function done(e, r) {
  console.log(`app  web ${e ? 'init.fail' : 'started'}`, e||'')
}


var app = require('./app.js')({config,done})
