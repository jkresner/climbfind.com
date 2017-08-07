pKey = FIXTURE.uniquify('places', 'sicg', 'name shortName')
place = FIXTURE.places[pKey]
# expect(place._id).to.be.undefined

ups = 
  name: "New name ${pKey}"
  shortName: "New name ${pKey}"          
  location: { timeZoneId: "Melbourne/Australia" }
  tokens: "Syd"

anon = (cb) ->
  GET '/mod/places', { status: 403 }, (e1, r1) ->  
    cb()

nonadmin = (cb) ->
  LOGIN 'ag', (s1) ->
    expect(s1._id).bsonIdStr()
    expect(s1.name).starts('Andy')
    GET '/mod/places', {status:403}, (e2) ->   
      POST '/mod/places', place, {status:403}, (e3) ->     
        LOGOUT cb

admin = (cb) -> 
  LOGIN 'jk', (s2) ->        
    expect(s2.name).starts('Jon')
    GET '/mod/places', (r1) ->   
      expect(r1.length > 0).to.be.true
      expect(r1[0]._id).bsonIdStr()
      GET "/mod/places/#{r1[0]._id}", (r2) ->     
        expect(r2).eqId(r1[0])
        POST '/mod/places', place, (r3) -> 
          expect(r3._id).bsonIdStr()
          expect(r3.name).to.equal(place.name)
          expect(r3.shortName).to.equal(place.shortName)
          expect(r3.location.timeZoneId).to.equal("Australia/Sydney")          
          expect(r3.log.last.action).to.equal('create')          
          ups.ownerId = s2._id
          PUT "/mod/places/#{r3._id}", ups, (r4) ->               
            expect(r4).eqId(r3)
            expect(r4.ownerId).eqId(s2._id)                  
            expect(r4.location.timeZoneId).eqId("Melbourne/Australia")                              
            DELETE "/mod/places/#{r3._id}", (r5) ->               
              GET "/mod/places/#{r3._id}", (r6) ->    
                expect(r6).eqId(r3)  
                expect(r6.deleted).to.exist
                cb()          

anon(->nonadmin(->admin(DONE)))

