var env            = process.env.ENV || 'dev'
var configure      = require('honeycombjs').Configure
var config         = configure(__dirname, env, true)


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
            $log(ts, `${name} error`.red, e.message)
            clearInterval(jobs[name].interval)
          } else if (comm)
            $log(ts, `${name} success`.white, JSON.stringify(comm.sent))
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

const Honey  = require('honeycombjs')
const worker = Honey.Worker(config, ready)
const model  = Honey.Model(config, ready)

model.connect( () =>

  worker.honey.wire({model})
              .merge(Honey.Auth)
              .track()
              .inflate(config.model.cache)
              .run()

)
