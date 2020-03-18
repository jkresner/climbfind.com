const Views = {
  item:      '_id type climbing time tz message user._id user.name user.avatar place._id place.name place.shortName place.avatar place.logo',
  list:      '_id type climbing time tz day message user._id user.name user.avatar place._id place.name place.shortName place.logo',
}


const Query = {
  existing: d => _.select(d, '_id time userId placeId'),
  list: subs => ({ $or:
    subs.map(s=>({ placeId:s.placeId,
      type: { $in: ['indoor','outdoor','official'].filter(t => s[t]) }
    }))
  })
}


const Opts = {
  existing: { select: 'userId placeId time' },

  item: { select: `_id time type climbing message userId placeId tz log`,
          join: { placeId: 'name shortName logo avatar',
                  userId: '_id name avatar emails photos' } },

  param: { select: `_id time type climbing message userId placeId tz log`,
          join: { placeId: '_id name',
                  userId: '_id name avatar emails photos' } },

  list: { sort: { _id: -1 },  // time: 1,
          select: `_id time tz.id type climbing message userId placeId`,
          join: { placeId: 'name shortName logo avatar', 
                  userId: '_id name avatar emails photos' },
          limit: 27 }
}


const Projections = ({copy,select,util,md5},{chain,view}) => ({

  place: d => {
    if (d.placeId && !d.place) {
      d.place = CAL.places.indoor[d.placeId]
      delete d.placeId
    }
    return d
  },

  localDay: d => {
    d.day = moment.tz(d.time, d.tz.id).format('ddd DD MMM')
    delete d.time
    return d
  },

  param: d => chain(d, 'user'),

  user: p => { 
    if (!p.user.avatar && p.user.emails) {
      let email = _.find(p.user.emails, o => o.primary)
      p.user.avatar = `https://0.gravatar.com/avatar/${md5(email.value)}`
    }
    return p
  },

  unix: r => assign(r, { time: moment(r.time).unix() }),
  item: r => chain(r, 'unix', 'user', view.item),


  list: d => {
    let posts = chain(copy(d.posts), 'unix', 'user')
    let now = moment().startOf('day').unix()
    let upcoming = posts.filter(p => p.time >= now)
    let past = posts.filter(p => p.time < now)
    return view.list(_.union(upcoming, past))
  },


  account: d => {
    d.posts = chain(d.posts, 'unix', view.list)
    d.posts.forEach(p => p.user.avatar = d.me.avatar)
    d.subscriptions = chain(d.subscriptions, 'subscriptions.list')
    d.settings = chain(d.settings, 'settings.account')
    return d
  }


})

module.exports = { Views, Query, Opts, Projections }
