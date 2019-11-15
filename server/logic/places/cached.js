module.exports = ({Place}, Data, DRY) => ({

  exec(cb) {
    var hash = { area: {}, indoor: {}, outdoor: {}, country: {} }
    Place.getManyByQuery(Data.Query.cached, Data.Opts.cached, (e,r) => {
      for (var p of r) {
        hash[p.type][p._id] = p
        if (/area/.test(p.type)) {
          let country = p.name.split(', ').pop()
          hash['country'][country] = (hash['country'][country] || []).concat([p._id])
        }
      }

      for (var id in hash.indoor)
        hash.indoor[id].linked.forEach(link =>
          hash['area'][link].linked.push(
            _.select(hash.indoor[id], '_id name')))

      cb(null, hash, r.length)
    })
  }

})

