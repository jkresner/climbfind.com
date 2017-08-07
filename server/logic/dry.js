module.exports = (DAL) => ({


  sys: {

    logAct: (on, action) => honey.logic.DRY.logAct(on, action,
      { _id: DAL.User.toId("514825fa2a26ea0200000017"), name:'sys' })

  },


  settings: {

    getSet(userId, opts = {}, cb) {
      var {Opts,Project} = honey.projector.settings
      var done = (e, r) => cb ? cb(e, e ? null : r.settings) : 0
      var ups = opts.tz ? {tz:opts.tz} : {}
      DAL.User.getById(userId, Opts.userSettings, (e, r) => {
        if (e || !r) return done(e, r)
        var settings = assign(r.settings || Project.defaults(ups), ups)
        DAL.User.updateSet(userId, {settings}, Opts.userSettings, done)
      })
    }

  }


})
