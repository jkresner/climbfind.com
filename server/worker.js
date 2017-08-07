// process.env.ENV    = 'prod'
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
        honey.logic.comm[name].exec((e,r) => {
          var end = moment()
          var ts = `${end.format("HH:mm:ss")} ${end.diff(start)}ms\t`
          if (e) {
            $log(ts, `${name} error`.red, e.message)
            clearInterval(jobs[name].interval)
          } else if (r)
            $log(ts, `${name} success`.white, JSON.stringify(r))
        })
      }
    }
    jobs[name].interval = setInterval(jobs[name].work, ms)
  }

  queueInterval('user_signup', 5000)
  queueInterval('chat_message', 15000)
  queueInterval('post_notify', 20000)
  // queueInterval('posts_weekly', 5000)


  // function posts_weekly() {
  //   $log(moment().format("HH:mm:ss"), 'posts_weekly'.green)
  // }



  // var job = {}
  // job.welcome = setInterval(auth_signup, 3000)
  // // setInterval(posts_notify, 15000)
  // // setInterval(chats_message, 6000)
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
