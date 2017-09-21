{bb,pgsf,mc,spot,sicg} = FIXTURE.places
post = null
ag = null
gk = null
jk = null
kk = null

module.exports = ->

  IT "posts by new users", ->
    LOGIN 'jk', (sJk) ->
      jk = sJk
      expectLog 'User', jk._id, 'signup login', 'welcome'
      POST "/posts/#{mc._id}", FIXTURE.uniq('post.sixpm.message'), (p1) ->
        post = p1
        LOGIN 'kk', ->
          POST "/posts/#{bb._id}", FIXTURE.uniq('post.teamup.message'), (p2) ->
            LOGIN 'ag', ->
              POST "/posts/#{mc._id}", FIXTURE.uniq('post.anylevel.message'), (p3) ->
                IN 100, -> LOGIN 'gk', ->
                  POST "/posts/#{mc._id}", FIXTURE.uniq('post.wkend.message'), (p5) ->
                    LOGIN 'jh', ->
                      POST "/posts/#{spot._id}", FIXTURE.uniq('post.comp.message'), (p5) ->
                        DONE()


  IT "posts have valid climbing types (tr|lead|boulder|etc.)", ->
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


  IT "subscriptions settings update", ->
    LOGIN 'jk', (s) ->
      jk = s
      expectLog 'User', jk._id, 'signup login login', 'welcome'
      expect(s.avatar).to.exist
      POST "/posts/#{pgsf._id}", FIXTURE.uniq('post.comeback.message'), (p) ->
        expectLog('Post', p._id, 'create')
        POST "/posts/#{pgsf._id}", FIXTURE.uniq('post.wkend.message'), () ->
          GET "/subscriptions", (r) ->
            expect(r.length).to.equal(2)
            expect(r[0].place.name).equal(mc.name)
            expect(r[0].indoor is "on").to.be.true
            expect(r[0].outdoor is "on").to.be.true
            expect(r[0].beat).to.equal('instant')
            expect(r[1].place.name).equal(pgsf.name)
            GET "/posts", (r2) ->
              expect(r2.length).to.equal(6)
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
                  expectLog 'User', jk._id, 'signup login login', 'welcome'
                  GET "/posts", (r5) ->
                    expect(r5.length).to.equal(3)
                    expect(r5[0].place.name).inc(pgsf.name)
                    expect(r5[1].place.name).inc(pgsf.name)
                    expect(r5[2].place.name).inc(pgsf.name)
                    DONE()


  IT "posts feed and reply one", ->
    LOGIN 'kk', (sKk) ->
      kk = sKk
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(1)
        expect(r1[0].user.name).inc('Kevin')
        GET "/chats/readpost/#{post._id}", (r2) =>
          expectLog('Post', post._id, 'create view')
          expect(r2._id).to.be.undefined
          expect(r2.history.length).to.equal(1)
          expectPostCopy(post, r2.history[0])
          reply = { chatId: undefined, text: "Mate we got to get this routine down so you stop winging about your pump hahahaha!", postId: post._id }
          POST "/chats/message", reply, (r3) =>
            expectLog('Post', post._id, 'create view reply')
            expect(r3._id).bsonIdStr()
            expect(r3.history.length).to.equal(2)
            expectPostCopy(post, r3.history[0])
            DONE()


  IT "posts feed and reply two", ->
    LOGIN 'ag', (sAg) ->
      ag = sAg
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(3)
        expect(r1[0].user.name).inc('Genie')
        expect(r1[1].user.name).inc('And')
        expect(r1[2].user.name).inc('Jonathon')
        expect(r1[2]._id).eqId(post._id)
        GET "/chats/readpost/#{r1[1]._id}", { status: 403 }, (e1) =>
          expect(e1.message).inc("reply to yourself")
          GET "/chats/readpost/#{post._id}", (r2) =>
            expect(r2._id).to.be.undefined
            expect(r2.history.length).to.equal(1)
            expectPostCopy(post, r2.history[0])
            reply = { chatId: undefined, text: "Yeah man lets do this", postId: post._id }
            POST "/chats/message", reply, (r3) =>
              expectLog('Chat', r3._id, 'message')
              expectLog('Post', post._id, 'create view reply view reply')
              expect(r3._id).bsonIdStr()
              expect(r3.history.length).to.equal(2)
              expectPostCopy(post, r3.history[0])
              expect(r3.history[1]._id).bsonIdStr()
              expect(r3.history[1].text).inc("Yeah man lets do this")
              expect(r3.history[1].user.name).to.equal(ag.name)
              expect(r3.history[1].user.avatar).to.equal(ag.avatar)
              DONE()


  IT "posts feed and reply three", ->
    LOGIN 'gk', (sGk) ->
      gk = sGk
      GET "/posts", (r1) ->
        expect(r1.length).to.equal(3)
        expect(r1[2].user.name).inc('Jonathon')
        expect(r1[1].user.name).inc(ag.name)
        GET "/chats/readpost/#{post._id}", (r2) =>
          expect(r2._id).to.be.undefined
          expect(r2.history.length).to.equal(1)
          expectPostCopy(post, r2.history[0])
          reply = { chatId: undefined, text: "Been so long. Can't wait to climb!", postId: post._id }
          POST "/chats/message", reply, (r3) =>
            expectLog('Chat', r3._id, 'message')
            expectLog('Post', post._id, 'create view reply view reply view reply')
            expect(r3._id).bsonIdStr()
            expect(r3.history.length).to.equal(2)
            expect(r3.history[1].text).inc("Been so long. Can't wait to climb!")
            expectPostCopy(post, r3.history[0])
            GET "/chats/readpost/#{post._id}", (r4) =>
              expectLog('Post', post._id, 'create view reply view reply view reply')
              DONE()


  IT "messages read and send", ->
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
          expectLog('Chat', r2._id, 'message read')
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
            expectLog('Chat', r3._id, 'message read message')
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

  DESCRIBE(".COMM", require('./basics_comm'))
