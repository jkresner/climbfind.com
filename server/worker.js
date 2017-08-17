const env          = process.env.ENV || 'dev'
const Honey        = require('honeycombjs')
let config         = Honey.Configure(__dirname, env, true)


function ready(e)   {

  console.log(`app  worker ${e ? 'init.fail' : 'started'}`, e||'')

  var jobs = {}
  var queueInterval = (name, ms) => {
    jobs[name] = {
      work: function () {
        var start = moment()
        $log(moment().format("HH:mm:ss"), name.gray)
        honey.logic.comm[name].exec((e,comm,r,raw) => {
          var end = moment()
          var ts = `${end.format("HH:mm:ss")} ${end.diff(start)}ms\t`
          if (e) {
            console.error(`${ts} ${name} error`.red, e.message)
            clearInterval(jobs[name].interval)
          } else if (comm)
            console.log(ts, `${name} sent`.white, comm.sent ? Object.keys(comm.sent).length : 0)
        })
      }
    }
    jobs[name].interval = setInterval(jobs[name].work, ms)
  }


  queueInterval('user_welcome', 50000)
  queueInterval('chat_message', 25000)
  queueInterval('post_notify', 40000)
  // queueInterval('posts_weekly', 5000)
}


const worker = Honey.Worker(config, ready)
const model  = Honey.Model(config, ready)

honeyAuthHack = {
  name:           'honey.auth',
  dir:            join(__dirname,'..','node_modules','honeycombjs','lib','auth'),
  logic:          false,
  model:          { opts: { excludes: ['org'] } },
  middleware:     false,
  routes:         false,
  wrappers:       false
}



model.connect( () =>

  worker.honey.wire({model})
              .merge({mergeConfig: () => honeyAuthHack })
              .track()
              .inflate(config.model.cache)
              .run()

)
