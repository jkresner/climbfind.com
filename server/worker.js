const env          = process.env.ENV || 'dev'
const Honey        = require('honeycombjs')
let config         = Honey.Configure(__dirname, env, true)


function ready(e)   {


  console.log(e
    ? 'app  WORKER fail: '.red + e.message
    : 'app  WORKER started\t\t      '.green)


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
            COMM.error(e, { subject:`{CF:wkr} ${name} ${e.message}` })
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


model.connect( () =>

  worker.honey.wire({model})
              .merge(Honey.Auth)
              .track()
              .inflate(config.model.cache)
              .run()

)
