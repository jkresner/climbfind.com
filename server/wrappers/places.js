var wrapper = {


  name: 'Places',


  init() {
    this.api = require('superagent')
    this.apiKey = honey.cfg('wrappers.places').key
  },


  search(name, cb)
  {
    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name.replace(/ /g,'+')}`
    if (this.apiKey) url += `&key=${this.apiKey}`

    this.api.get(url)
            .accept('application/json')
            .end((e, res) => {

      if (e || !res.ok || !res.body.results)
       return cb(e || Error(`Google.Places search failed`))

      let {results} = res.body
      LOG('wrpr.call', 'Places.search', `${url}\n` + JSON.stringify(results).gray)

      if (results.length > 1)
        results.forEach(r =>
          $log(`  ${r.place_id}\t`.blue.dim+`${r.formatted_address.yellow}\t`, r.name))

      cb(null, _.select(results[0], 'id name formatted_address place_id'))
    })
  },


  getAreaClimbing(city, opts, cb)
  {
    if (!cb) {
      cb = opts
      opts = {}
    }

    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=rock+climbing+in+${city.replace(/ /g,'+')}`
    if (opts.refine) url += opts.refine
    if (this.apiKey) url += `&key=${this.apiKey}`

    this.api.get(url)
            .accept('application/json')
            .end((e, res) => {
      // LOG('wrpr.places', `go.getRockClimbing`, e, !res.ok || res.body)

      if (e || !res.ok || !res.body.results)
       return cb(e || Error(`Google.Places getCityClimbing failed`))

      let {results} = res.body
      let {length} = (results||[])
      LOG('wrpr.call', `Places.getAreaClimbing(${city})[${length}]`, `${url}\n` + JSON.stringify(results).gray)

      for (var p of results)
        $log(`  ${p.place_id}  `.cyan+`${p.name}  `.blue, p.formatted_address)

      cb(null, results.map(p=>_.select(p,'place_id name formatted_address')))
    })
  },


  placeById(id, cb)
  {
    var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}`
    if (this.apiKey) url += `&key=${this.apiKey}`

    this.api.get(url)
            .accept('application/json')
            .end((e, res) => {

      if (e || !res.ok || !res.body.result)
       return cb(e || Error(`Google.Places getPlaceDetails failed`))

      let {result} = res.body
      LOG('wrpr.call', `Places.placeById`, `${url}\n` + JSON.stringify(result).gray)

      var r = _.select(result, 'address_components formatted_address formatted_phone_number geometry id name opening_hours.weekday_text place_id rating types utc_offset vicinity website')
      // $log('getPlaceDetails.r'.green, r)

      cb(null, r)
    })
  }


}


module.exports = wrapper
