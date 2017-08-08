{bb,pgsf,mc,spot,sicg} = FIXTURE.places
post = null
ag = null
gk = null
jk = null
kk = null

expectPostCopy = (post, msg) ->
  expect(msg._id).eqId(post._id)
  expect(msg.text).to.inc(post.message)
  expect(msg.user.name).to.equal(post.user.name)
  # expect(msg.user.avatar).to.equal(post.user.avatar)
expectMeta = (model, id, actions) ->  
  actions = actions.split(' ')
  DB.docById model, id, (r) ->
    {history} = r.log
    expect(history.length, "#{model}[#{id}] history.length[#{history.length}] != #{actions}").to.equal(actions.length)
    for idx in [0..actions.length-1]
      expect(history[idx].action, "#{model}[#{id}] history[#{idx}] != #{actions[idx]}").to.equal(actions[idx])


module.exports = ->

  # before (done) ->

  IT "clear collections", ->
    # honey.model.Place.collection.update({}, {$rename:{meta:'log'}}, {multi:true})
    # honey.model.Place.collection.update({}, {$rename:{'log.activity':'log.history'}}, {multi:true})
    # .update({}, {$rename:{'log.lastTouch':'log.last'}}, {multi:true})
    DB.removeDocs 'Session', {}, ->
      DB.removeDocs 'Event', {}, ->
        DB.removeDocs 'Post', {}, ->
          DB.removeDocs 'Subscription', {}, ->
            DB.removeDocs 'Comm', {}, ->        
              DB.removeDocs 'Route', {}, ->                
                DB.removeDocs 'Chat', {}, ->
                  DB.removeDocs 'User', {}, ->
                    DB.ensureDocs 'User', [FIXTURE.users.jk], -> 
                      DONE()

  
  IT.skip "places", ->    
    sys = _id:ObjectId("514825fa2a26ea0200000017"), name:'sys.bootstrap'
    {Place} = honey.model.DAL
    approve = (key) -> (res, rej) -> 
      p = FIXTURE.places[key]
      Place.getById p._id, (e0, r0) ->
        data = _.select(p, 'climbing name shortName logo avatar')
        if r0.approved?
          $log("#{r0._id} #{'already approved'.yellow}\t #{r0.name}")
          res(r0)
        else          
          data.log = honey.logic.DRY.logAct(r0, 'approve', sys)
          data.approved = data.log.last
          Place.updateSet p._id, data, (e,r) => 
            $log("#{r0._id} #{'update approved.r\t'.green} #{r.name} (#{data.shortName})")
            if e? then rej(e) else res(r)

    err = (e) -> $log('all.err'.red, e)
    ok = (ok) -> 
      $log('all.ok'.green, ok.length)
      DONE()
    Promise.all(Object.keys(FIXTURE.places).map (key) -> new Promise(approve(key))).then(ok, err)
      

  IT "users signup and posts", ->
    LOGIN 'jk', ->
      POST "/posts/#{mc._id}", FIXTURE.uniq('post.sixpm.message'), (p1) ->
        post = p1        
        LOGIN 'kk', ->
          POST "/posts/#{bb._id}", FIXTURE.uniq('post.teamup.message'), (p2) ->
            LOGIN 'ag', ->        
              POST "/posts/#{mc._id}", FIXTURE.uniq('post.anylevel.message'), (p3) ->
                LOGIN 'gk', ->
                  POST "/posts/#{mc._id}", FIXTURE.uniq('post.wkend.message'), (p5) ->                  
                    LOGIN 'jh', ->
                      POST "/posts/#{spot._id}", FIXTURE.uniq('post.comp.message'), (p5) ->                  
                        DONE()


  IT "fail post with invalid climbing", ->   
    data = FIXTURE.uniq('post.squamish.message')
    data.climbing = ['junk']
    LOGIN 'tc', ->
      POST "/posts/#{spot._id}", data, { status: 403 }, (e1) ->                  
        expect(e1.message).inc('Climbing type junk invalid')
        data.climbing = ['lead']
        POST "/posts/#{spot._id}", data, { status: 403 }, (e2) ->                  
          expect(e2.message).inc('lead climbing not available @ The Spot')        
          POST "/posts/#{sicg._id}", FIXTURE.uniq('post.squamish.message'), (p1) ->                                
            DONE()


  IT "Customize double subscription", ->        
    LOGIN 'jk', (s) ->   
      jk = s     
      expect(s.avatar).to.exist
      POST "/posts/#{pgsf._id}", FIXTURE.uniq('post.comeback.message'), (p) ->  
        expectMeta('Post', p._id, 'create')
        POST "/posts/#{pgsf._id}", FIXTURE.uniq('post.wkend.message'), () ->        
          GET "/subscriptions", (r) ->
            expect(r.length).to.equal(2)
            expect(r[0].place.name).equal(mc.name)
            expect(r[0].indoor is "on").to.be.true
            expect(r[0].outdoor is "on").to.be.true
            expect(r[0].beat).to.equal('instant')
            expect(r[1].place.name).equal(pgsf.name)
            GET "/posts", (r2) ->
              expect(r2.length).to.equal(5)
              expect(r2[0].climbing).to.exist
              expect(r2[0].climbing[0]).to.equal('tr')
              ups = assign(r[0],{indoor:"off",beat:'weekly'})
              PUT "/subscriptions/#{ups._id}", ups, (r3) ->
                expect(r3._id).eqId(r[0]._id)
                expect(r3.place.name).to.equal(mc.name)
                expect(r3.indoor is "off").to.be.true
                expect(r3.outdoor is "on").to.be.true
                expect(r3.beat).to.equal('weekly')                
                GET "/subscriptions", (r4) ->
                  expect(r4.length).to.equal(2)
                  expect(r4[0].place.name).equal(mc.name)
                  expect(r4[0].indoor is "off").to.be.true
                  expect(r4[0].outdoor is "on").to.be.true
                  expect(r4[0].beat).to.equal('weekly')                                  
                  expect(r4[1].place.name).equal(pgsf.name)     
                  GET "/posts", (r5) ->
                    expect(r5.length).to.equal(2)
                    expect(r5[0].place.name).inc(pgsf.name)
                    expect(r5[1].place.name).inc(pgsf.name)
                    DONE()


  IT "reply three", ->        
    LOGIN 'kk', (sKk) ->        
      kk = sKk    
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(1)       
        expect(r1[0].user.name).inc('Kevin')
        GET "/chats/readpost/#{post._id}", (r2) =>
          expectMeta('Post', post._id, 'create view')
          expect(r2._id).to.be.undefined
          expect(r2.history.length).to.equal(1)
          expectPostCopy(post, r2.history[0])
          reply = { chatId: undefined, text: "Mate we got to get this routine down so you stop winging about your pump hahahaha!", postId: post._id }            
          POST "/chats/message", reply, (r3) =>
            expectMeta('Post', post._id, 'create view reply')
            expect(r3._id).bsonIdStr()
            expect(r3.history.length).to.equal(2)
            expectPostCopy(post, r3.history[0])              
            DONE()


  IT "COMM.user_welcome notify emails", ->
    DB.docsByQuery 'User', {}, (users) -> 
      expect(users.length).equal(6)
    honey.logic.comm.user_welcome.exec (e, c, r, raw) ->
      expect(e).to.be.null
      expect(c._id).bsonId()
      expect(c.type).to.equal('user_welcome')
      expect(c.data.user._id).eqId(r._id)
      expect(c.templates.length).to.equal(1)            
      expect(c.templates[0].key).to.equal('user_welcome:ses')
      expect(c.templates[0].type).to.equal('mail')                 
      expect(c.retry).to.be.undefined
      expect(Object.keys(c.sent).length).to.equal(1)
      expect(c.sent[jk._id][0].to).inc(jk.name)
      expect(r.log.comm['welcome']).to.exist
      expect(r.log.last.action).to.equal('sys.welcome')
      expect(raw[0]).inc([
        "Congrats on your Climbfind account"
        "/ses/post/#{c._sid}"])
      honey.logic.comm.user_welcome.exec (e2, c2, r2, raw2) ->
        expect(e2).to.be.null
        expect(c2._id).bsonId()
        expect(_.idsEqual(c._id,c2._id) is false).to.be.true
        expect(c2.templates.length).to.equal(1)         
        expect(Object.keys(c2.sent).length).to.equal(1)
        expect(c2.sent[kk._id][0].to).inc(kk.name)
        expect(r2.log.comm['welcome']).to.exist
        DONE()


  IT "reply one", ->
    LOGIN 'ag', (sAg) ->            
      ag = sAg
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(3)
        expect(r1[0].time <= r1[1].time).to.be.true
        expect(r1[1].time <= r1[2].time).to.be.true
        expect(r1[0].user.name).inc('Jonathon')
        expect(r1[2].user.name).inc('Genie')          
        expect(r1[1].user.name).inc('Andy')
        expect(r1[0]._id).eqId(post._id)
        GET "/chats/readpost/#{r1[1]._id}", { status: 403 }, (e1) =>
          expect(e1.message).inc("reply to yourself")
          GET "/chats/readpost/#{post._id}", (r2) =>
            expect(r2._id).to.be.undefined
            expect(r2.history.length).to.equal(1)
            expectPostCopy(post, r2.history[0])
            reply = { chatId: undefined, text: "Yeah man lets do this", postId: post._id }
            POST "/chats/message", reply, (r3) =>
              expectMeta('Chat', r3._id, 'message')
              expectMeta('Post', post._id, 'create view reply view reply')
              expect(r3._id).bsonIdStr()
              expect(r3.history.length).to.equal(2)
              expectPostCopy(post, r3.history[0])
              expect(r3.history[1]._id).bsonIdStr()
              expect(r3.history[1].text).inc("Yeah man lets do this")
              expect(r3.history[1].user.name).to.equal(ag.name)
              expect(r3.history[1].user.avatar).to.equal(ag.avatar)
              DONE()

  IT "reply two", ->        
    LOGIN 'gk', (sGk) ->        
      gk = sGk    
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(3)       
        expect(r1[0].user.name).inc('Jonathon')
        expect(r1[1].user.name).inc('Andy')
        GET "/chats/readpost/#{post._id}", (r2) =>
          expect(r2._id).to.be.undefined
          expect(r2.history.length).to.equal(1)
          expectPostCopy(post, r2.history[0])
          reply = { chatId: undefined, text: "Been so long. Can't wait to climb!", postId: post._id }            
          POST "/chats/message", reply, (r3) =>
            expectMeta('Chat', r3._id, 'message')
            expectMeta('Post', post._id, 'create view reply view reply view reply')
            expect(r3._id).bsonIdStr()
            expect(r3.history.length).to.equal(2)
            expect(r3.history[1].text).inc("Been so long. Can't wait to climb!")              
            expectPostCopy(post, r3.history[0])              
            GET "/chats/readpost/#{post._id}", (r4) =>
              expectMeta('Post', post._id, 'create view reply view reply view reply')
              DONE()


  IT "COMM post_notify emails", ->
    honey.logic.comm.post_notify.exec (e, comm, r, raw) ->
      expect(e).to.be.null
      expect(r.log.last.action).to.equal("notify:2")
      expect(comm._id).bsonId()
      expect(comm.type).to.equal('post_notify')
      expect(comm.data.post._id).eqId(r._id)
      expect(comm.tz.id).to.equal(r.tz.id)
      expect(comm.tz.utc_offset).to.equal(r.tz.utc_offset)      
      expect(comm.templates.length).to.equal(1)            
      expect(comm.templates[0].key).to.equal('post_notify:ses')
      expect(comm.templates[0].type).to.equal('mail')                 
      expect(comm.retry).to.be.undefined
      expect(Object.keys(comm.sent).length).to.equal(2)
      sent = Object.values(comm.sent)
      expect(sent[0][0].to).inc(gk.name)
      expect(sent[1][0].to).inc(ag.name)
      expect(raw.length).to.equal(2)
      expect(raw[0]).inc(['Hi Andy,',"](http://localhost:4444/ses/reply/#{comm._sid})"])
      expect(raw[1]).inc(['Hi Genie,',"](http://localhost:4444/ses/reply/#{comm._sid})"])
      # $log(raw[0], raw[1])
      honey.logic.comm.post_notify.exec (e2, comm2, r2, raw2) ->      
        expect(_.idsEqual(r._id, r2._id) is false).to.be.true
        notify2 = comm2
        expect(notify2).to.exist
        expect(notify2.data.post._id).eqId(r2._id)
        expect(notify2.type).to.equal('post_notify')        
        expect(notify2.retry).to.be.undefined
        expect(notify2.sent).to.be.undefined
        expect(notify2.templates).to.be.undefined        
        expect(notify2.tz).to.be.undefined
        honey.logic.comm.post_notify.exec (e3, comm3, r3, raw3) ->              
          expect(_.idsEqual(r._id,r3._id) is false).to.be.true                    
          expect(comm3.type).to.equal('post_notify')        
          expect(comm3.retry).to.be.undefined
          expect(Object.keys(comm3.sent).length).to.equal(1)
          expect(comm3.sent[gk._id][0].to).inc(gk.name)
          expect(raw3[0]).inc(['Hi Genie,',"](http://localhost:4444/ses/reply/#{comm3._sid})"])       
          DONE()


  IT "converse", ->        
    LOGIN 'jk', (sJk) ->            
      jk = sJk
      GET "/chats/inbox", (r1) ->
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
          expectMeta('Chat', r2._id, 'message read')
          expect(r2._id).eqId(r1[1]._id)
          expect(r2.users.length).to.equal(2)
          expect(r2.users[0].name).inc('Jonathon Kresner')
          expect(r2.users[0].avatar).to.equal(jk.avatar)
          expect(r2.users[1].name).inc(ag.name)
          expect(r2.users[1].avatar).to.equal(ag.avatar)          
          expect(r2.history.length).to.equal(2)
          expect(r2.history[1]._id).bsonIdStr()
          expect(r2.history[1].text).inc("Yeah man lets do this")
          expectPostCopy(post, r2.history[0])
          reply = { chatId: r2._id, text: "Cool see you tonight at 8pm", postId: undefined }            
          POST "/chats/message", reply, (r3) =>
            expectMeta('Chat', r3._id, 'message read message')
            expect(r3._id).eqId(r2._id)
            expect(r3.history.length).to.equal(3)
            expectPostCopy(post, r3.history[0])
            expect(r3.history[0]._id).eqId(r2.history[0]._id)
            expect(r3.history[2].text).to.equal("Cool see you tonight at 8pm")
            GET "/chats/inbox", (r4) ->
              expect(r4.length).to.equal(3)                
              expect(r4[0]._id).eqId(r1[1]._id)
              expect(r4[0].with[0].name).to.equal(ag.name)                
              expect(r4[0].unread is false).to.be.true
              expect(r4[1].with[0].name).to.equal(gk.name)                
              expect(r4[1].unread).to.be.true
              GET "/chats/read/#{r1[0]._id}", (r5) ->          
                expect(r5._id).eqId(r4[1]._id)
                expect(r5.users.length).to.equal(2)
                expect(r5.users[0]._id).eqId(jk._id)
                expect(r5.users[0].name).inc(jk.name)
                expect(r5.users[1]._id).eqId(gk._id)
                expect(r5.users[1].name).inc(gk.name)
                expect(r5.history[1].text).to.equal("Been so long. Can't wait to climb!")
                expectPostCopy(post, r5.history[0])
                GET "/chats/inbox", (r6) ->
                  expect(r6.length).to.equal(3)
                  expect(r6[0]._id).eqId(r1[1]._id)
                  expect(r6[0].unread is false).to.be.true
                  expect(r6[1].unread is false).to.be.true
                  expect(r6[2].unread is true).to.be.true
                  DONE()       

  
  IT "COMM chat_message emails", ->
    honey.logic.comm.chat_message.exec (e, comm, r, raw) ->
      expect(r.log.last.action).to.equal("notify:1")      
      expect(r.history[0].commId).eqId(comm._id)
      expect(comm._id).bsonId()
      expect(comm.type).to.equal('chat_message')
      expect(comm.data.chat._id).eqId(r._id)
      expect(comm.tz).to.be.undefined
      expect(comm.templates.length).to.equal(1)            
      expect(comm.templates[0].key).to.equal('chat_message:ses')
      expect(comm.templates[0].type).to.equal('mail')                 
      expect(comm.retry).to.be.undefined
      expect(Object.keys(comm.sent).length).to.equal(1)
      sent = Object.values(comm.sent)
      expect(sent[0][0].to).inc(jk.name)
      expect(raw.length).to.equal(1)
      expect(raw[0]).inc(['Jonathon,',"from Kevin",        
        "message](http://localhost:4444/ses/chat/#{comm._sid})"
        "settings](http://localhost:4444/ses/settings/#{comm._sid})"
        # "](http://localhost:4444/messages/#{r._id}?message=#{r.history[0]._id}&amp;comm=chats_message:ses)"
        # "](http://localhost:4444/messages/#{r._id}?message=#{r.history[0]._id}&comm=chats_message:ses)"
        ])
      honey.logic.comm.chat_message.exec (e2, comm2, r2, raw2) ->      
        expect(_.idsEqual(r._id,r2._id) is false).to.be.true
        expect(comm2).to.exist
        expect(comm2.data.chat._id).eqId(r2._id)
        expect(comm2.type).to.equal('chat_message')        
        expect(comm2.retry).to.be.undefined
        expect(Object.keys(comm2.sent).length).to.equal(1)
        sent2 = Object.values(comm2.sent)
        expect(sent2[0][0].to).inc(jk.name)
        expect(comm2.templates[0].key).to.equal('chat_message:ses')    
        honey.logic.comm.chat_message.exec (e3, r3, raw3) ->              
          LOGIN "jk", (s) ->
            PAGE "/ses/settings/#{comm._sid}", { status: 302 }, (txt) ->
              expect(txt).inc("Redirecting to /account")
              DB.docById 'Comm', comm._id, (cDB) ->
                expect(cDB.sent[jk._id][0].to).inc(jk.name)
                expect(cDB.sent[jk._id][0].ct).to.exist
                expect(cDB.sent[jk._id][0].ct[0]._id).bsonId()
                expect(cDB.sent[jk._id][0].ct[0].link).to.equal('settings')
                DONE()
            




  # IT "clear analytics", ->
    # DB.removeDocs 'Session', {}, ->
      # DB.removeDocs 'Event', {}, ->      
        # DONE()