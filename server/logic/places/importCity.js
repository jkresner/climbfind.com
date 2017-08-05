module.exports = ({Place}, Data, DRY) => ({


  validate(user, place, cb) {

  },


  exec(place, cb) {
  var resject = (reject, resolve) => (e, r) => e ? reject(e) : resolve(r)

  // Wrappers.Places.getCity(c.shortName, (e0, r) => {
  //   if (e0) throw e0
  //   $log('Place[queryCity]', r)
  // })

 // Promise.all(city.map( c =>
 //    // new Promise((res, rej) => queryCity(c, resject(res, rej)))
 //      new Promise((res, rej) => importCity(c, resject(res, rej)))
 //    )).then(r => $log('Promise.all.done', r) )


  var touch = (meta, action) => honey.logic.DRY.sys.touchMeta(meta, action)
  var {Place} = honey.model.DAL


  function getClimbing(city) {
    $log('getClimbing'.blue, city.name)
    Wrappers.Places.getCityClimbing(city.name, (e0,r0) => {
      if (e0) throw e0
      $log('Places.r0', r0.length)
      Promise.all( r0.map( p => new Promise((res, rej) =>
        Place.getByQuery({'raw.place_id':p.place_id}, (e1, r1) => {
          if (e1) return rej(e1)
          if (r1) return res(r1)
          Wrappers.Places.getPlaceDetails(p.place_id, (e2, r2) => {
            if (e2) return rej(e2)
            Place.create({ name: r2.name,
               shortName: r2.name,
               type: 'indoor',
               climbing: ['boulder'],
               geo: {
                  address: r2.formatted_address,
                  tz: city.geo.tz,
                  lat: r2.geometry.location.lat,
                  lng: r2.geometry.location.lng
               },
               raw: r2,
               linked: [city._id],
               meta: touch(null, 'create')
            }, resject(res, rej))
          })
        })
      ))).then( resutls =>
        $log(`[${city.name}].getPlaceDetails.Promise.all.done`.green, resutls)
      )
    })
  }

  Place.getByQuery({'raw.place_id':c.pid}, (e,r) => {
    if (!r) {
      Wrappers.Places.getPlaceDetails(c.pid, (e0, r0) => {
        if (e0) return cb(e0)
        var p = { name: c.name,
                  shortName: c.shortName,
                  type: 'area',
                  climbing: ['lead','tr','boulder'],
                  geo: {
                    tz: c.tz, //utc_offset:
                    lat: r0.geometry.location.lat,
                    lng: r0.geometry.location.lng
                  },
                  raw: r0,
                  meta: touch(null, 'create')
                }
        p.approved = touch(p.meta, 'approve').lastTouch
        $log('Place[area].create', p.raw)
        Place.create(p, (e1, r1) => {
          if (e1) return cb(e1)
          cb(null, e1)
          // getClimbing(r1)
        })
      })
    }
    else
      getClimbing(r)
  })
  }


})
