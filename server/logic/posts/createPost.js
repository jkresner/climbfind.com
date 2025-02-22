module.exports = (DAL, Data, DRY) => ({

  validate(user, p, place) {
    if (!p.type) return 'Type required'
    if (!p.message) return 'Message required'
    if (!p.climbing || !(p.climbing.length > 0)) return 'Climbing types [boulder, top rope, lead] required'
    for (var t of p.climbing) {
      if (honey.model.Enum.CLIMBING.indexOf(t) == -1)
        return `Climbing type ${t} invalid`
      if (place.climbing.indexOf(t) == -1)
        return `${t} climbing not available @ ${place.name}`
    }

    if (!(p.day > -1 && p.day < 7)) return 'Climbing day [0-6] required'
    if (place.deleted) return `Partner calls disabled for ${place.name}`
    if (!place.geo.tz) return `Place[${place._id}:place.name] timeZoneId missing`
  },

  exec(data, place, cb) {
    let user = this.user
    let localDayStart = moment.tz(place.geo.tz).startOf('day')
    data.userId = user._id
    data.placeId = place._id
    data.log = DRY.logAct(null, 'create', user)
    data.time = localDayStart.utc().add(data.day,'day').toDate()
    data.tz = { id: place.geo.tz, utc_offset:
      moment.tz.zone('America/Los_Angeles').utcOffset(localDayStart) }
      // moment.tz.zone('America/Los_Angeles').offset(localDayStart) }

    DAL.Post.getByQuery(Data.Query.existing(data), (e, existing) => {
      if (e||existing)
        return cb(e||DRY.Forbidden(`Posted already to ${place.name}`))

      DAL.Post.create(data, (e,r) => {
        if (e) return cb(e)
        assign(r, {place,user})
        cb(e, r)
        var q = { userId: user._id, placeId: place._id }
        DAL.Subscription.getByQuery(q, (e2, sub) => {
          DRY.settings.getSet(user._id, {tz:data.tz})
          if (!e2 && !sub)
            DAL.Subscription.create(assign({log:data.log},q))
        })
        // CAL.flush('latest')
        TRACK('post', this, r)
      })
    })
  },

  project: Data.Project.item

})
