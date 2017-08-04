var wrapper = {


  name: 'Places',


  init() {
    this.api = require('superagent')
    this.apiKey = honey.cfg('wrappers.places').key
  },


  getCity(city, cb)
  {
    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city.replace(/ /g,'+')}`
    if (this.apiKey) url += `&key=${this.apiKey}`

    $log('getCity'.yellow, url)
    this.api.get(url)
            .accept('application/json')
            .end((e, res) => {

      if (e || !res.ok || !res.body.results)
       return cb(e || Error(`Google.Places getCity failed`))

      $log('getCity.e'.red, e)
      $log('getCity.r'.green, res.body.results)
      for (var r of res.body.results)
      {
        var {lat,lng} = r.geometry.location
        $log(`${lat} ${lng}\t`+`${r.name}\t`.blue, r.formatted_address)
      }

      var city = _.select(res.body.results[0], 'id name place_id')
      cb(null, city)
    })
  },


  getCityClimbing(city, cb)
  {
    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=rock+climbing+in+${city.replace(/ /g,'+')}`
    var r = []
    if (this.apiKey) url += `&key=${this.apiKey}`

    $log('getCityClimbing'.yellow, url)
    this.api.get(url)
            .accept('application/json')
            .end((e, res) => {
      // LOG('wrpr.places', `go.getRockClimbing`, e, !res.ok || res.body)
      $log('getCityClimbing.e'.red, e)
      $log('getCityClimbing.r'.green, (res.body.results||{}).length)
      if (e || !res.ok || !res.body.results)
       return cb(e || Error(`Google.Places getCityClimbing failed`))

      $log('getCityClimbing.res'.green, res.body.results)
      for (var p of res.body.results)
      {
        var {lat,lng} = p.geometry.location
        $log(`${lat} ${lng}\t`+`${p.name}\t`.blue, p.formatted_address)
        r.push({lat,lng,name:p.name,place_id:p.place_id})
      }

      cb(null, r)
    })
  },


  getPlaceDetails(id, cb)
  {
    var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}`
    if (this.apiKey) url += `&key=${this.apiKey}`

    $log('getPlaceDetails'.yellow, url)
    this.api.get(url)
            .accept('application/json')
            .end((e, res) => {
      // LOG('wrpr.places', `go.getRockClimbing`, e, !res.ok || res.body)

      $log('getPlaceDetails.e'.red, e)
      if (e || !res.ok || !res.body.result)
       return cb(e || Error(`Google.Places getPlaceDetails failed`))

      // $log('getPlaceDetails'.green, res.body.result)
      var r = _.select(res.body.result, 'address_components formatted_address formatted_phone_number geometry id name opening_hours.weekday_text place_id rating types utc_offset vicinity website')
      var {lat,lng} = r.geometry.location
      $log(`${lat} ${lng}\t`+`${r.name}\t`.cyan, r.formatted_address)
      $log('getPlaceDetails.r'.green, r)

      cb(null, r)
    })
  }


}


module.exports = wrapper
