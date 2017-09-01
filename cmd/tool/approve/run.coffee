SCREAM             = require('screamjs')
Honey              = require('honeycombjs')


OPTS =
  setup:
    done: (e) ->
      global.sys = _id: ObjectId("514825fa2a26ea0200000017"), name:'sys.approve'
      console.log("SCREAM  setup done")


SCREAM(OPTS).run (done) ->

  env              = process.env.ENV || 'dev'
  console.log("APPROVE --mode #{env}")
  appDir           = join(__dirname, '/../../../server')
  config           = Honey.Configure(appDir, env, true)
  config.model.domain.mongoUrl = OPTS.config.db.mongo.url

  delete config.model.cache
  worker           = Honey.Worker(config, done)
  model            = Honey.Model(config, done)

  model.connect -> worker.honey.wire({model}).merge(Honey.Auth).run()
