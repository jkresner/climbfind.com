module.exports = function({config,done}) {


  const Honey  = require('honeycombjs')
  const app    = Honey.App(config, done)
  const model  = Honey.Model(config, done)

  model.connect( () =>

    app.honey.wire({model})
       .merge(Honey.Auth)
       .inflate(config.model.cache)
       .chain(config.middleware, config.routes)
       .run()

  )

  return app


}
