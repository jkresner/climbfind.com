function norobot(opts={}) {
  this.mwName = `nobot`
  const disallow = new RegExp(`${opts.ud}|null`)

  return function(req, res, done) {
    let {ip,ua,ud,ref} = req.ctx
    let uds = ud.split('|')
    for (let group of uds) {
      if (disallow.test(group)) {
        res.send(opts.content)
        return done(null, `${ip} ${ud} => ${group} ${ua?ua:'noUA'}${ref?' <<< '+ref:''}`, true)
      }
    }
    done()
  }
}


module.exports = (app, mw) => {
  mw.req.extend('norobot', norobot)
  return mw.req.norobot({ ud: 'ban|libs', content:'' })
}
