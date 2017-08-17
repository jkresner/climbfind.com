indoor = null

module.exports = ->


  before ->
    indoor = Object.values(FIXTURE.places.indoor)
    OI "indoor", indoor


  IT "Approve", ->
    {Place} = honey.model.DAL
    {approvePlace} = honey.logic.mod
    OI 'approvePlace', approvePlace
    set = indoor.map (d) ->
      (cb) ->
        Place.getById d._id, (ee, place) ->
          expect(place._id).eqId(d._id)
          expect(place.approved).to.be.undefined
          update = _.select(d, "climbing name shortName")
          update.logo = "https://i.imgur.com/#{d.imgur.logo}.png"
          update.avatar = "https://i.imgur.com/#{d.imgur.avatar}.png"
          approvePlace.chain.call {user:sys}, update, place, (e, r) ->
            $log("#{r._id} #{'update approved.r\t'.green} #{r.name} (#{r.shortName})")
            cb(e, r)

    AFTER set, (r) -> DONE()
