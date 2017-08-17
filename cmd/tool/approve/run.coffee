SCREAM             = require('screamjs')
Honey              = require('honeycombjs')
path               = require('path')


opts =
  setup:
    done: (e) ->
      global.sys = _id: ObjectId("514825fa2a26ea0200000017"), name:'sys.approve'
      console.log("SCREAM  setup done")


SCREAM(opts).run (done) ->

  env              = process.env.ENV || 'dev'
  console.log("APPROVE --mode #{env}")
  appDir           = path.join(__dirname, '/../../../server')
  config           = Honey.Configure(appDir, env, true)
  delete config.model.cache
  worker           = Honey.Worker(config, done)
  model            = Honey.Model(config, done)

  model.connect -> worker.honey.wire({model}).merge(Honey.Auth).run()
