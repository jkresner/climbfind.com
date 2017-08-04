const Views = {
  item:      '_id type climbing time message user._id user.name user.avatar place.name place.shortName place.avatar place.logo',
  list:      '_id type climbing time message user._id user.name user.avatar place.name place.shortName place.logo',
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

  item: { select: `_id time type climbing message userId placeId meta`,
          join: { placeId: 'name shortName logo avatar',
                  userId: '_id name photos' } },

  list: { sort: { time: 1, _id: -1 },
          select: `_id time type climbing message userId placeId`,
          join: { placeId: 'name shortName logo avatar' , userId: '_id name photos' },
          limit: 25 }
}


const Projections = ({select,util},{chain,view}) => ({

  user: p => p.user.avatar ? p :
    assign(p, { user: chain(p.user, 'auth.avatar') }),


  unix: r => assign(r, { time: moment(r.time).unix() }),
  item: r => chain(r, 'unix', 'user', view.item),


  list: d => {
    var posts = chain(d.posts, 'unix', 'user', view.list)
    var now = moment().startOf('day').unix()
    var past = posts.filter(p => p.time < now)
    var upcoming = posts.filter(p => p.time >= now)
    past.reverse()
    return _.union(upcoming, past)
  },


  account: d => {
    d.posts = chain(d.posts, 'unix', view.list)
    d.posts.forEach(p => p.user.avatar = d.me.avatar)
    d.subscriptions = chain(d.subscriptions, 'subscriptions.list')
    return d
  }


})

module.exports = { Views, Query, Opts, Projections }
