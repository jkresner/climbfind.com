const Views = {
  list: '_id place._id place.name place.shortName place.avatar place.logo indoor outdoor official email push beat fb_group.id',
}

const Query = {
  notify: post => {
    var q = { beat:'instant', placeId: post.place._id,
      userId: { $ne: post.user._id } }
    q[post.place.type] = true
    return q
  }
}

const Opts = {
  list: { select: `_id userId placeId indoor outdoor official email push beat fb_group.id`,
          // join: { placeId: '_id name avatar' }
          sort: { _id: 1 }
        },
  comm: { select: `_id userId placeId indoor outdoor email push beat`,
          join: { userId: '_id name emails photos' } }
}

module.exports = { Views, Opts, Query,

  Projections: ({select},{chain,view}) => ({

    notify: d =>
      assign(chain(d.user, 'auth.comm'), { by: select(d, '_id email push')}),

    list: d => chain(d, 'item'),

    item: d => {
      d.place = cache.places.indoor[d.placeId]
      d.email = d.email ? "on" : "off"
      d.push = d.push ? "on" : "off"
      d.indoor = d.indoor ? "on" : "off"
      d.outdoor = d.outdoor ? "on" : "off"
      // d.official = d.official ? "on" : "off"
      return view.list(d)
    }

  })

}
