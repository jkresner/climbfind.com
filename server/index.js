// process.env.ENV    = 'prod'
var env            = process.env.ENV || 'dev'
var configure      = require('honeycombjs').Configure
var config         = configure(__dirname, env, true)


function done(e, r) {
  e ? console.log(`>> App init fail`, e)
    : console.log(`>> Listening on port ${config.http.port}`)
}


var app = require('./app.js')({config,done})
