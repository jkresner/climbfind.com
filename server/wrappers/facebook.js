var wrapper = {

  name:  'facebook',
  noop:  e => e ? $log('facebook.error'.red, e) : 0,

  init(config) {
    var {comm}               = config
    this.groups              = comm.dispatch.groups
    if (comm.mode == 'stub')
      this.api = createTransport(require('nodemailer-stub-transport')())
    else {
      var sesTransport       = require('nodemailer-ses-transport')
      this.api = createTransport(sesTransport(config.wrappers.ses))
    }

    this.api.use('compile', markdown())
    LOG('comm.init', `SES  (${comm.mode})`)
  },

  _send(mail, opts, cb)
  {
    cb = cb || this.noop
    mail.from = address(opts.sender)
    this.api.sendMail(mail, (e, info) => {
      LOG('comm.send', `ses ${mail.from}`, mail.subject.white)
      LOG('comm.mail', 'mail.to', mail.to.join(',').white, '\n'+mail.text.dim)
      cb(e, mail)
    })
  },

  sendUser(user, mail, opts, cb) {
    mail.to = [address(user)]
    this._send(mail,opts,cb)
  },

  sendGroup(group, mail, opts, cb) {
    if (group != 'errors')
      throw "SES haven't implemented groups propertly yet"
    mail.to = this.groups.errors.split(',')
    this._send(mail,opts,cb)
  }

}

module.exports = wrapper
