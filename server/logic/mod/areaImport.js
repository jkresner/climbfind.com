module.exports = (DAL, Data, DRY) => ({


  validate(user, name) {

  },


  exec({name,short,tz,refine}, cb) {

    let addClimbing = area => Wrappers.Places.getAreaClimbing(name, {refine}, (e,r) => {
      if (e) throw e
      Promise.all(r.map( ({place_id}) => new Promise((res, rej) =>
        DAL.Place.getByQuery({'raw.place_id':place_id}, (e1, existing) => {
          if (e1) return rej(e1)
          if (existing) {
            $log(`link <${short}>\t${existing._id}  ${existing.name}`.green.dim)
            let log = DRY.logAct(existing, 'link', this.user)
            let linked = existing.linked.concat([area._id])
            DAL.Place.updateSet(existing._id, {log,linked}, DRY.resject(res, rej))
          }
          else {
            Wrappers.Places.placeById(place_id, (e2, r2) => {
              if (e2) return rej(e2)
              let _id = DRY.id.new()
              $log(`add  (${short})\t${_id}  ${r2.name}`.green)
              DAL.Place.create({
                _id,
                name: r2.name,
                shortName: r2.name,
                type: 'indoor',
                climbing: ['lead','tr','boulder'],
                geo: {
                  address: r2.formatted_address, tz,
                  lat: r2.geometry.location.lat,
                  lng: r2.geometry.location.lng },
                raw: r2,
                linked: [area._id],
                log: DRY.logAct(null, 'create', this.user)
              }, DRY.resject(res, rej))
            })
          }
        })
      ))).then(places => cb(null, assign(area, {places}), e => cb(e)))
    })

    Wrappers.Places.search(name, (e, r) => {
      if (e) throw e
      $log(`  ${r.place_id}  `.blue+`${r.formatted_address.green}  (top match)`)
      DAL.Place.getByQuery({'raw.place_id':r.place_id}, (e1, existing) => {
        if (e1) return cb(e1)
        if (existing) return cb(Error(`${name} - existing match`), existing)
        Wrappers.Places.placeById(r.place_id, (e2, raw) => {
          if (e2) return cb(e2)
          var p = { name, shortName: short, type: 'area', raw,
                    climbing: ['lead','tr','boulder'],
                    geo: { tz,
                      lat: raw.geometry.location.lat,
                      lng: raw.geometry.location.lng },
                    log: DRY.logAct(null, 'create', this.user) }
          p.approved = p.log.last
          DAL.Place.create(p, (e3, r3) => {
            if (e3) return cb(e3)
            // $log('Place[area].create', r3)
            addClimbing(r3)
          })
        })
      })
    })
  }

})
