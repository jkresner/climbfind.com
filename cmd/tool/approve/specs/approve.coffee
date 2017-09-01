indoor = null

module.exports = ->


  before ->
    indoor = Object.values(FIXTURE.places.approve)


  IT "Approve", ->
    OI "indoor", indoor
    {Place} = honey.model.DAL
    approve = honey.logic.mod.placeApprove.chain
    set = indoor.map (d) ->
      (cb) ->
        Place.getById d._id, (ee, place) ->
          expect(place._id).eqId(d._id)
          expect(place.approved).to.be.undefined
          update = _.select(d, "climbing name shortName")
          update.logo = "https://i.imgur.com/#{d.imgur.logo}.png"
          update.avatar = "https://i.imgur.com/#{d.imgur.avatar}.png"
          approve.call {user:sys}, update, place, (e, r) ->
            $log("#{r._id} #{'update approved.r\t'.green} #{r.name} (#{r.shortName})")
            cb(e, r)

    WHEN set, (r) -> DONE()


  IT "Reassign Posts & Subscriptions", ->
    {Post,Subscription} = honey.model.DAL
    toId = honey.logic.DRY.id.parse
    places = FIXTURE.places.reassign_to
    keys = Object.keys(places)
    posts = []
    subscriptions = []
    for key in keys
      placeId = toId(FIXTURE.places.approve[key]._id)
      for postId in places[key].posts
        posts.push({placeId,_id:toId(postId)})
      for subId in places[key].subs
        subscriptions.push({placeId, _id:toId(subId)})

    Post.updateSetBulk posts, (e, r0) ->
      expect(r0.modifiedCount, 'post updates').to.equal(posts.length)
      # $log('Post.updateSetBulk', e, r)
      Subscription.updateSetBulk subscriptions, (e, r1) ->
        expect(r1.modifiedCount, 'sub updates').to.equal(subscriptions.length)
        # $log('Subscription.updateSetBulk', e, r)
        DONE()
