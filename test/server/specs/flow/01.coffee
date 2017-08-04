suffix = moment().format('X')

data = 
  placeId:  FIXTURE.places.pgsf._id
  type:     "intro"
  climbing: ["tr"]
  day:      2
  message:  "#{suffix} #{FIXTURE.post.sixpm.message}"


GET '/posts', { status: 403 }, ->       
  key = STORY.signup 'jk', (session) ->
    expect(session._id).bsonIdStr()
    expect(session.name).inc('Jonathon')
    POST "/posts/#{data.placeId}", data, (r1) ->           
      expect(r1._id).bsonIdStr() 
      expect(r1.place.name).to.equal('Planet Granite San Francisco')
      expect(r1.place.avatar).to.exist    
      expect(r1.message).to.equal(data.message)
      expect(r1.user).eqId(session)
      expect(r1.user.name).to.equal(session.name)    
      time = moment.unix(r1.time)
      mom = moment().add(2, 'day')
      expect(time.year()).to.equal(mom.year())
      expect(time.month()).to.equal(mom.month())
      expect(time.date()).to.equal(mom.date())      
      expect(time.hour()).to.equal(0)
      expect(time.minute()).to.equal(0)     
      GET '/subscriptions', (r2) ->              
        expect(r2.length).to.equal(1)
        expect(r2[0]._id).bsonIdStr()
        expect(r2[0].userId).to.be.undefined
        expect(r2[0].fb_group).to.be.undefined        
        expect(r2[0].place._id).eqId(FIXTURE.places.pgsf._id)
        expect(r2[0].place.name).to.exist
        expect(r2[0].indoor is "on").to.be.true
        expect(r2[0].outdoor is "on").to.be.true
        # expect(r2[0].official).to.be.true
        expect(r2[0].email is "on").to.be.true
        expect(r2[0].push is "off").to.be.true                          
        expect(r2[0].beat).to.equal('instant')
        DONE()
