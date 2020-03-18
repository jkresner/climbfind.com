ag = null
gk = null
jk = null
kk = null


module.exports = ->

  before ->
    jk = FIXTURE.users.jk
    kk = FIXTURE.users.kk
    gk = FIXTURE.users.gk
    ag = FIXTURE.users.ag


  IT "user_welcome notify emails", ->
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
      expect(c.sent[kk._id][0].to).inc(kk.name)
      expect(r.log.comm['welcome']).to.exist
      expect(r.log.last.action).to.equal('sys.welcome')
      expect(raw[0]).inc([
        "get started"
        "/ses/post/#{c._sid}"])
      honey.logic.comm.user_welcome.exec (e2, c2, r2, raw2) ->
        expect(e2).to.be.null
        expect(c2._id).bsonId()
        expect(_.idsEqual(c._id,c2._id) is false).to.be.true
        expect(c2.templates.length).to.equal(1)
        expect(Object.keys(c2.sent).length).to.equal(1)
        # expect(c2.sent[ag._id][0].to).inc(ag.name)
        expect(r2.log.comm['welcome']).to.exist
        DONE()


  IT "post_notify emails", ->
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
      # expect(sent[1][0].to).inc(gk.name)
      # expect(sent[0][0].to).inc(ag.name)

      expect(raw.length).to.equal(2)
      expect(raw[0]).inc(['Andrew,',"](http://localhost:4444/ses/reply/#{comm._sid})"])
      expect(raw[1]).inc(['Genie,',"](http://localhost:4444/ses/reply/#{comm._sid})"])
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
          expect(raw3[0]).inc(['Genie,',"](http://localhost:4444/ses/reply/#{comm3._sid})"])
          DONE()


  IT "chat_message emails", ->
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

