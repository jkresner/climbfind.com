SCREAM                       = require('screamjs')

test = auth:
  login: { fnName: 'oauth', url: '/auth/test/login' }

opts =
  setup: (e) -> 
    console.log('SCREAM.SETUP done', e)
  login:
    clearSessions: true
    test: test.auth.login
    fn: (data, cb) ->
      profile = FIXTURE.oauth[data.key||data]
      token = _.get(profile,"tokens.cf.token") || "test"
      config.test.auth.login.fn.call @, 'facebook', profile, {token}, cb
 
# // tracking                     = require('../../server/app.track')
# // test = auth:
# //   login:                     { fnName: 'loginAuthor', url: '/auth/test/login' }

SCREAM(opts).run (done) ->
  appDir           = __dirname + '/../../server/'
  configure        = require('honeycombjs').Configure
  config           = configure(appDir, 'test', true)
  config.test      = test
  app              = require(appDir+'app.js')({config,done})

#   config.test     = test
#   if !process.env.LOG_APP_VERBOSE
#     delete config.log.mw.forbid
