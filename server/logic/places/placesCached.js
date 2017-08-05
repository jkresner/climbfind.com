module.exports = ({Place}, Data, DRY) => ({

  exec(cb) {
    var hash = { area: {}, indoor: {}, outdoor: {} }
    Place.getManyByQuery(Data.Query.cached, Data.Opts.cached, (e,r) => {
      for (var p of r)
        hash[p.type][p._id] = p

      for (var id in hash.indoor)
        hash.indoor[id].linked.forEach(link =>
          hash['area'][link].linked.push(
            _.select(hash.indoor[id], '_id name')))


      cb(null, hash, r.length)
    })
  }

})

