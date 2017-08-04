{bb,pgsf,mc,spot,sicg} = FIXTURE.places
expectPostCopy = (post, msg) ->
  expect(msg._id).eqId(post._id)
  expect(msg.text).to.equal(post.message)
  expect(msg.user.name).to.equal(post.user.name)
  # expect(msg.user.avatar).to.equal(post.user.avatar)
post = null
ag = null
gk = null
jk = null

module.exports = ->

  # before (done) ->

  IT "clear collections", ->
    DB.removeDocs 'Post', {}, ->
      DB.removeDocs 'Subscription', {}, ->
        DB.removeDocs 'Chat', {}, ->
          DB.removeDocs 'User', {}, ->
            DB.ensureDocs 'User', [FIXTURE.users.jk], -> 
              DONE()

  
  IT.skip "places", ->
    # DB.removeDocs 'Place', {}, ->
    # mongorestore --drop --db cf_test ~/ap_mongo/cf_test
    
    sys = _id:ObjectId("514825fa2a26ea0200000017"), name:'sys.bootstrap'
    touch = (meta, action) => 
    Place = honey.model.DAL.Place
    approve = (key) -> (res, rej) -> 
      p = FIXTURE.places[key]
      Place.getById p._id, (e0, r0) ->
        data = _.select(p, 'climbing name shortName logo avatar')
        # $log('place.getById'.yellow, r0.name, r0.approved, data)
        if r0.approved?
          $log("#{r0._id} #{'already approved'.yellow}\t #{r0.name}")
          res(r0)
        else          
          data.meta = honey.logic.DRY.touchMeta(r0.meta, 'approve', sys)
          data.approved = data.meta.lastTouch
          Place.updateSet p._id, data, (e,r) => 
            $log("#{r0._id} #{'update approved.r\t'.green} #{r.name} (#{data.shortName})")
            if e? then rej(e) else res(r)

    err = (e) -> $log('all.err'.red, e)
    ok = (ok) -> 
      $log('all.ok'.green, ok.length)
      DONE()
    Promise.all(Object.keys(FIXTURE.places).map (key) -> new Promise(approve(key))).then(ok, err)
      


  IT "user n posts", ->
    LOGIN 'jk', ->
      POST "/posts/#{pgsf._id}", FIXTURE.uniq('post.sixpm.message'), (p1) ->
        LOGIN 'kk', ->
          POST "/posts/#{bb._id}", FIXTURE.uniq('post.teamup.message'), (p2) ->
            LOGIN 'ag', ->        
              POST "/posts/#{mc._id}", FIXTURE.uniq('post.anylevel.message'), (p3) ->
                LOGIN 'tc', ->
                  POST "/posts/#{spot._id}", FIXTURE.uniq('post.squamish.message'), { status: 403 }, (e4) ->                  
                    expect(e4.message).inc('lead climbing not available @ The Spot')
                    POST "/posts/#{sicg._id}", FIXTURE.uniq('post.squamish.message'), (p4) ->                    
                      LOGIN 'gk', ->
                        POST "/posts/#{mc._id}", FIXTURE.uniq('post.wkend.message'), (p5) ->                  
                          LOGIN 'jh', ->
                            POST "/posts/#{spot._id}", assign(FIXTURE.uniq('post.wkend.message'), {climbing:['boulder']}), (p5) ->                  
                              DONE()
        

  IT "Customize double subscription", ->        
    LOGIN 'jk', (s) ->        
      expect(s.avatar).to.exist
      POST "/posts/#{mc._id}", FIXTURE.uniq('post.wkend.message'), (p) ->  
        post = p
        POST "/posts/#{pgsf._id}", FIXTURE.uniq('post.wkend.message'), () ->        
          GET "/subscriptions", (r) ->
            expect(r.length).to.equal(2)
            expect(r[0].place.name).equal(pgsf.name)
            expect(r[0].indoor is "on").to.be.true
            expect(r[0].outdoor is "on").to.be.true
            expect(r[0].beat).to.equal('instant')
            expect(r[1].place.name).equal(mc.name)            
            GET "/posts", (r2) ->
              expect(r2.length).to.equal(5)
              expect(r2[0].climbing).to.exist
              expect(r2[0].climbing[0]).to.equal('tr')
              ups = assign(r[0],{indoor:"off",beat:'weekly'})
              PUT "/subscriptions/#{ups._id}", ups, (r3) ->
                expect(r3._id).eqId(r[0]._id)
                expect(r3.place.name).to.equal(pgsf.name)
                expect(r3.indoor is "off").to.be.true
                expect(r3.outdoor is "on").to.be.true
                expect(r3.beat).to.equal('weekly')                
                GET "/subscriptions", (r4) ->
                  expect(r4.length).to.equal(2)
                  expect(r4[0].place.name).equal(pgsf.name)
                  expect(r4[0].indoor is "off").to.be.true
                  expect(r4[0].outdoor is "on").to.be.true
                  expect(r4[0].beat).to.equal('weekly')                                  
                  expect(r4[1].place.name).equal(mc.name)     
                  GET "/posts", (r5) ->
                    expect(r5.length).to.equal(3)
                    expect(r5[0].place.name).inc('Mission Cliff')
                    expect(r5[1].place.name).inc('Mission Cliff')
                    expect(r5[2].place.name).inc('Mission Cliff')                    
                    DONE()

  IT "reply three", ->        
    LOGIN 'kk', (sKk) ->        
      kk = sKk    
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(1)       
        expect(r1[0].user.name).inc('Kevin')
        GET "/chats/readpost/#{post._id}", (r2) =>
          expect(r2._id).to.be.undefined
          expect(r2.history.length).to.equal(1)
          # OI 'post', post
          expectPostCopy(post, r2.history[0])
          reply = { chatId: undefined, text: "Mate we got to get this routine down so you stop winging about your pump hahahaha!", postId: post._id }            
          POST "/chats/message", reply, (r3) =>
            expect(r3._id).bsonIdStr()
            expect(r3.history.length).to.equal(2)
            expectPostCopy(post, r3.history[0])              
            DONE()

  IT "reply one", ->
    LOGIN 'ag', (sAg) ->            
      ag = sAg
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(3)
        # $log('r1[0]', r1[0].time, moment.unix(r1[0].time), r1[0].user.name)
        # $log('r1[1]', r1[1].time, moment.unix(r1[1].time), r1[1].user.name)
        # $log('r1[2]', r1[2].time, moment.unix(r1[2].time), r1[2].user.name)
        expect(r1[0].time <= r1[1].time).to.be.true
        expect(r1[1].time <= r1[2].time).to.be.true
        expect(r1[1].user.name).inc('Jonathon')
        expect(r1[2].user.name).inc('Genie')          
        expect(r1[0].user.name).inc('Andy')
        expect(r1[1]._id).eqId(post._id)
        post = r1[1]
        GET "/chats/readpost/#{r1[0]._id}", { status: 403 }, (e1) =>
          expect(e1.message).inc("reply to yourself")
          GET "/chats/readpost/#{post._id}", (r2) =>
            expect(r2._id).to.be.undefined
            expect(r2.history.length).to.equal(1)
            expectPostCopy(post, r2.history[0])
            reply = { chatId: undefined, text: "Yeah man lets do this", postId: post._id }
            POST "/chats/message", reply, (r3) =>
              expect(r3._id).bsonIdStr()
              expect(r3.history.length).to.equal(2)
              expectPostCopy(post, r3.history[0])
              expect(r3.history[1]._id).bsonIdStr()
              expect(r3.history[1].text).inc("Yeah man lets do this")
              expect(r3.history[1].user.name).to.equal(ag.name)
              # expect(r3.history[1].user.avatar).to.equal(ag.avatar)
              DONE()

  IT "reply two", ->        
    LOGIN 'gk', (sGk) ->        
      gk = sGk    
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(3)       
        expect(r1[1].user.name).inc('Jonathon')
        expect(r1[0].user.name).inc('Andy')
        GET "/chats/readpost/#{post._id}", (r2) =>
          expect(r2._id).to.be.undefined
          expect(r2.history.length).to.equal(1)
          expectPostCopy(post, r2.history[0])
          reply = { chatId: undefined, text: "Been so long. Can't wait to climb!", postId: post._id }            
          POST "/chats/message", reply, (r3) =>
            expect(r3._id).bsonIdStr()
            expect(r3.history.length).to.equal(2)
            expect(r3.history[1].text).inc("Been so long. Can't wait to climb!")              
            expectPostCopy(post, r3.history[0])              
            DONE()


  IT "converse", ->        
    LOGIN 'jk', (sJk) ->            
      jk = sJk
      GET "/chats/inbox", (r1) ->
        # OI "got inbox", r1[0].last, r1[1].last, r1[2].last
        expect(r1.length).to.equal(3)
        expect(r1[0]._id).bsonIdStr()
        expect(r1[0].unread).to.be.true
        expect(r1[0].with.length).to.equal(1)
        expect(r1[0].with[0].name).to.equal(gk.name)          
        expect(r1[0].with[0].avatar).to.equal(gk.avatar)
        expect(r1[0].with[0]._id).eqId(gk._id)    
        expect(r1[0].last._id).bsonIdStr()
        expect(r1[0].last.user._id).eqId(gk._id)          
        expect(r1[0].last.text).inc("Been so long. Can't wait to climb!")
        expect(r1[1]._id).bsonIdStr()
        expect(r1[1].unread).to.be.true     
        expect(r1[1].with.length).to.equal(1)
        expect(r1[1].with[0]._id).eqId(ag._id)    
        expect(r1[1].with[0].name).to.equal(ag.name)                                   
        expect(r1[1].with[0].avatar).to.equal(ag.avatar)
        expect(r1[1].last._id).bsonIdStr()
        expect(r1[1].last.user._id).eqId(ag._id)          
        expect(r1[1].last.text).inc("Yeah man lets do this")
        GET "/chats/read/#{r1[1]._id}", (r2) ->          
          expect(r2._id).eqId(r1[1]._id)
          # expect(r2.users.length).to.equal(2)
          # expect(r2.users[0].name).inc('Jonathon Kresner')
          # expect(r2.users[0].avatar).to.equal(jk.avatar)
          expect(r2.users[0].name).inc(ag.name)
          expect(r2.users[0].avatar).to.equal(ag.avatar)          
          # expect(r2.users[1].name).inc(ag.name)          
          # expect(r2.users[1].avatar).to.equal(ag.avatar)
          expect(r2.history.length).to.equal(2)
          expect(r2.history[1]._id).bsonIdStr()
          expect(r2.history[1].text).inc("Yeah man lets do this")
          expectPostCopy(post, r2.history[0])
          reply = { chatId: r2._id, text: "Cool see you tonight at 8pm", postId: undefined }            
          POST "/chats/message", reply, (r3) =>
            expect(r3._id).eqId(r2._id)
            expect(r3.history.length).to.equal(3)
            expectPostCopy(post, r3.history[0])
            expect(r3.history[0]._id).eqId(r2.history[0]._id)
            expect(r3.history[2].text).to.equal("Cool see you tonight at 8pm")
            GET "/chats/inbox", (r4) ->
              expect(r4.length).to.equal(3)                
              # OI('r4', r4[0], r4[1])
              expect(r4[0]._id).eqId(r1[1]._id)
              expect(r4[0].with[0].name).to.equal(ag.name)                
              expect(r4[0].unread is false).to.be.true
              expect(r4[1].with[0].name).to.equal(gk.name)                
              expect(r4[1].unread).to.be.true
              GET "/chats/read/#{r1[0]._id}", (r5) ->          
                expect(r5._id).eqId(r4[1]._id)
                expect(r5.users.length).to.equal(1)
                # expect(r5.users[0]._id).eqId(jk._id)
                # expect(r5.users[0].name).inc(jk.name)
                expect(r5.users[0]._id).eqId(gk._id)
                expect(r5.users[0].name).inc(gk.name)
                expect(r5.history[1].text).to.equal("Been so long. Can't wait to climb!")
                expectPostCopy(post, r5.history[0])
                GET "/chats/inbox", (r6) ->
                  expect(r6.length).to.equal(3)
                  expect(r6[0]._id).eqId(r1[1]._id)
                  expect(r6[0].unread is false).to.be.true
                  expect(r6[1].unread is false).to.be.true
                  expect(r6[2].unread is true).to.be.true
                  DONE()       