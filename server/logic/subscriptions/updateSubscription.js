module.exports = (DAL, Data, DRY) => ({


  validate(user, original, up) {
    if (!_.idsEqual(original.userId, user._id))
      return `Subscription[${original._id}] not owned by you[${user._id}]`

    if (!up.beat || honey.model.Enum.SUBSCRIPTION.BEAT.indexOf(up.beat) == -1)
      return `instant / weekly / off required`

    if (!up.indoor || !/(on|off)/.test(up.indoor))
      return `on/off for indoor notifications required`

    if (!up.outdoor || !/(on|off)/.test(up.outdoor))
      return `on/off for outdoor notifications required`

    if (!up.email || !/(on|off)/.test(up.email))
      return `email notifications on/off required`

    if (!up.push || !/(on|off)/.test(up.push))
      return `push notifications on/off required`
  },


  exec(original, update, cb) {
    var ups = {
      meta: DRY.touchMeta(original.meta, 'update', this.user),
      beat: update.beat,
      indoor: update.indoor == "on",
      outdoor: update.outdoor == "on",
      email: update.email == "on",
      push: update.push == "on"
    }

    DAL.Subscription.updateSet(original._id, ups, Data.Opts.list, cb)
  },


  project: Data.Project.item


})
