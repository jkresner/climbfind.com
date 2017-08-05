// process.env.ENV    = 'prod'
var env            = process.env.ENV || 'dev'
var configure      = require('honeycombjs').Configure
var config         = configure(__dirname, env, true)


function ready(e) {
  console.log(`app  worker ${e ? 'init.fail' : 'started'}`, e||'')

  function posts_weekly() {
    $log(moment().format("HH:mm:ss"), 'posts_weekly'.green)
  }

  function posts_notify() {
    var start = moment()
    $log(start.format("HH:mm:ss"), 'start   posts_notify'.yellow)
    honey.logic.comm.posts_notify.exec((e,r) => {
      var end = moment()
      var ts = `${end.format("HH:mm:ss")} ${end.diff(start)}ms\t`
      if (e) $log(ts, 'posts_notify error'.red, e.message)
      else if (r) $log(ts, 'posts_notify success'.cyan, r.meta.lastTouch.action)
      else $log(ts, 'posts_notify nowork'.gray)
    })
  }

  function chats_message() {
    var start = moment()
    $log(start.format("HH:mm:ss"), 'start   chats_message'.yellow)
    honey.logic.comm.chats_message.exec((e,r) => {
      var end = moment()
      var ts = `${end.format("HH:mm:ss")} ${end.diff(start)}ms\t`
      if (e) $log(ts, 'chats_message error'.red, e.message)
      else if (r) $log(ts, 'chats_message success'.cyan, r.meta.lastTouch.action)
      else $log(ts, 'chats_message nowork'.gray)
    })
  }

  setInterval(posts_notify, 15000)
  setInterval(chats_message, 6000)
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
