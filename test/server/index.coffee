SCREAM                       = require('screamjs')
Honey                        = require('honeycombjs')
path                         = require('path')


opts =
  setup:                     { done: require('./setup') }
  login:
    session:                 null
    accept:                  'application/json'
    status:                  200
    logic:                   'oauth'
    url:                     '/auth/test/login'
    handler: (data, cb) ->
      profile = FIXTURE.oauth[data.key]
      existing = FIXTURE.users[data.key]
      opts.login.fn.call @, existing, 'facebook', profile, {token:'test'}, (e,r) =>
        if r? and !(FIXTURE.users[data.key]or{})._id
          FIXTURE.users[data.key] = r
        cb(e, r)


SCREAM(opts).run (done) ->
  appDir                     = path.join(__dirname, '/../../server')
  config                     = Honey.Configure(appDir, 'test', true)
  config.routes.auth.test    = { on:true, login: opts.login }
  app                        = require(path.join(appDir,'app.js'))({config,done})
