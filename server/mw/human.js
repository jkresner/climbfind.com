function norobot(opts={}) {
  this.mwName = `nobot`
  var disallow = new RegExp(`${opts.ud}|null`)

  return function(req, res, done) {
    var {ip,ua,ud,ref} = req.ctx
    var uds = (ud||'null').split('|')
    var deny = false
    for (var group of uds)
      if (disallow.test(group)) deny = true

    if (deny) {
      res.send(opts.content)
      return done(null, `${ip} ${ud} ${deny?deny:''} ${ua?ua:'noUA'}${ref?' <<< '+ref:''}`, true)
    }

    done()
  }
}


module.exports = (app, mw) => {

  mw.req.extend('noCrawl', norobot)

  return mw.req.noCrawl({ ud: 'ban|libs', content:'' })

}


/**                                                                  noCrawl(
* Similar to res.empty but instead of waiting for a url to not match any
* routes, gate a known route or router. Requires session.ua to execute
* earlier in the middleware chain to know if the userAgent is a bot.
*
*  Object    @opts[optional]
*   String    .content to 200 respond to all requests by bots
*   String    .group
*   String    .redirectUrl to http 301 respond (ignored if .content set)
*   Function  .onDisallow custom hook to log bot activity
noCrawl(opts) {
  opts = opts || {}
  var redirectUrl = opts.redirectUrl || false
  var content = opts.hasOwnProperty('content') ? opts.content : false
  var onDisallow = opts.onDisallow || null
  var disallow = opts.group ? `${opts.group}|null` : 'null'
  this.mwName = `noCrawl:${disallow}`
  var check = new RegExp(disallow)

  return function(req, res, done) {
    // if (req.ctx.ud) return done()
    var groups = (req.ctx.ud||'null').split('|')
    var deny = false
    for (var group of groups) if (check.test(group)) deny = true
    // console.log('noCrawl'.yellow, 'disallow'.magenta, disallow)
    if (!deny) return done()

    if (onDisallow) onDisallow(req)
    if (content!==false) res.send(content)
    else if (redirectUrl) res.redirect(301, redirectUrl)

    var {ip,ua,ref} = req.ctx
    done(null, `${ip} ${req.ctx.ud} ${deny?deny:''} ${ua?ua:'noUA'}${ref?' <<< '+ref:''}`, $req.STOP)
  }
}*/
