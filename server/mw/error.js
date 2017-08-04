module.exports = (app, mw) =>

  mw.res.error({
    render: { view: 'error', layout:false, about: config.about },
    verbose: process.env.LOG_VERBOSE || honey.cfg('log.it.verbose'),
    quiet: /prod/i.test(config.env),
    onError: function(req, e) {
      try {
        var msg = e.message.replace(/ /g,'').replace('contact@climbfind.com','')
        var name = e.status || (msg.length > 24 ? msg.substring(0,24) : msg)
        var context = honey.projector._.select(req.ctx, 'ip sId user ua ud')
        if (/prod/i.test(config.env))
          analytics.issue(context, name, 'error', {stack:e.stack,msg:e.message,url:req.originalUrl,headers:req.headers})

        COMM.error(e, { req, subject:`{CF} ${e.message}` })
      }
      catch (ERR) {
        console.log('SHEEEET'.red, ERR.stack, e.stack)
      }
    }
  })
