let honey            = require('honeycombjs')
let env              = process.env.ENV||'dev'
let config           = honey.Configure(__dirname, env)
let label            = `${'app'.dim}  WEB ${env.yellow} `


let done = e => console.log(e
  ? `${label} ERR:\t    `.red + e.message
  : `${label} \t\t      `.green + config.http.host)


global.app = require('./app.js')({config,done})
