module.exports = (DAL, Data, DRY) => ({


  validate(user, up) {
    if (!up.tz || !up.tz.id || !up.tz.utc_offset)
      return `timezone required`

    if (!up.notifications)
      return `notification settings required`

    if (!up.notifications.message)
      return `message notification settings required`

    if (!up.notifications.weekly)
      return `weekly notification settings required`

    var {message,weekly} = up.notifications

    if (!messages.email || !/(on|off)/.test(messages.email))
      return `message email notifications on/off required`
    if (!messages.push || !/(on|off)/.test(messages.push))
      return `message push notifications on/off required`
    if (!weekly.day || !(weekly.day > 0 && weekly.day < 8))
      return `weekly email notifications on/off required`
    if (!weekly.email || !/(on|off)/.test(weekly.email))
      return `weekly email notifications on/off required`
    if (!weekly.push || !/(on|off)/.test(weekly.push))
      return `weekly push notifications on/off required`
  },


  exec(ups, cb) {
    var me = this._id
    // DAL.User.getById(me._id, {select: '_id meta'}, (e, r) => {
      // meta: DRY.touchMeta(original.meta, 'update', this.user),
    // }
    var {messages,weekly} = ups.notifications
    ups.notifications.messages.email = messages.email == "on"
    ups.notifications.messages.push = messages.push == "on"
    ups.notifications.weekly.email = weekly.email == "on"
    ups.notifications.weekly.push = weekly.push == "on"

    DAL.User.updateSet(me, {settings:ups}, (e,r) => {
      cb(e, ups)
    })
  },


  project: Data.Project.item


})
