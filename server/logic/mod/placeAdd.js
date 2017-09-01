module.exports = (DAL, Data, DRY) => ({


  validate(user, name, linked) {
    // if (!area || !area._id) return `Linked area required for place ${name}`
  },


  exec({name, tz, linked}, cb) {
    Wrappers.Places.search(name, (e, r) => {
      if (e) throw e
      $log(`  ${r.place_id}  `.blue+`${r.formatted_address.green}  (top match)`)
      DAL.Place.getByQuery({'raw.place_id':r.place_id}, (e1, existing) => {
        if (e1) return cb(e1)
        if (existing) return cb(Error(`${search} - existing match`), existing)
        Wrappers.Places.placeById(r.place_id, (e2, r2) => {
          if (e2) return cb(e2)
          DAL.Place.create({
            name: r2.name,
            shortName: r2.name,
            type: 'indoor',
            climbing: ['lead','tr','boulder'],
            geo: {
              address: r2.formatted_address, tz,
              lat: r2.geometry.location.lat,
              lng: r2.geometry.location.lng },
            raw: r2,
            linked,
            log: DRY.logAct(null, 'create', this.user)
          }, cb)
        })
      })
    })
  }

})
