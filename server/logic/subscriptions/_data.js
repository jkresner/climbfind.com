const Views = {
  list: '_id place._id place.name place.shortName place.avatar place.logo indoor outdoor official email push beat fb_group.id',
}

const Query = {

}

const Opts = {
  list: { select: `_id userId placeId indoor outdoor official email push beat fb_group.id`,
          // join: { placeId: '_id name avatar' }
          sort: { _id: 1 }
        }
}

module.exports = { Views, Opts, Query,

  Projections: ({select},{chain,view}) => ({

    list: d => chain(d, 'item'),

    item: d => {
      d.place = CAL.places.indoor[d.placeId]
      d.email = d.email ? "on" : "off"
      d.push = d.push ? "on" : "off"
      d.indoor = d.indoor ? "on" : "off"
      d.outdoor = d.outdoor ? "on" : "off"
      // d.official = d.official ? "on" : "off"
      return view.list(d)
    }

  })

}
