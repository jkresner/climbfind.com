var mute = new RegExp(honey.cfg('log.errors.mute'))

module.exports = (app, mw) =>

  mw.res.error({
    render: { view: 'error', layout:false, about: config.about },
    verbose: !!(process.env.LOG_VERBOSE || honey.cfg('log.verbose')),
    quiet: process.env.LOG_QUIET || /prod/i.test(config.env),
    renderCustom: function(e, req, res) {
      if (mute.test(e.message))
        return res.status(200).send('')

      return false
    },
    onError: function(req, e) {
      if (mute.test(e.message)) return

      try {
        let msg = e.message.replace(/ /g,'').replace('contact@climbfind.com','')
        let name = e.status || (msg.length > 24 ? msg.substring(0,24) : msg)
        let ctx = _.select(req.ctx, 'ip sId user ua ud')
        let data = { stack: e.stack, msg:e.message, url:req.originalUrl, headers:req.headers }

        if (/prod/i.test(config.env))
          analytics.issue(ctx, name, 'error', assign(data, e.honey||{}))
        else if (e.honey)
          $log('error data'.red, honey.log.op(e.honey))

        COMM.error(e, { req, subject:`{CF} ${e.message}` })
      }
      catch (ERR) {
        console.log('SHEEEET'.red, ERR.stack, e.stack)
      }
    }
  })
