ag = null
jk = null
send = null

module.exports = ->

  before (done) ->
    send = honey.logic.comm.chat_message.exec
    jk = FIXTURE.users.jk
    ag = FIXTURE.users.ag
    qRemove = 'emails.value': { $or: [jk.emails[0].value, ag.emails[0].value] }
    DB.removeDocs 'User', qRemove, (r0) ->
      DB.ensureDocs 'User', [jk,ag], (r1) ->
        DB.ensureDocs 'Chat', [FIXTURE.chats.jk_ag], (r2) ->
          done()

  IT "Live data - chat_message notify by email", ->
    send (e, c, r, raw) ->
      expect(e).to.be.null
      expect(c._id).bsonId()
      expect(c.type).to.equal('chat_message')
      expect(c.data.message.user.name).to.equal(ag.name)
      expect(c.templates.length).to.equal(1)
      expect(c.templates[0].key).to.equal('chat_message:ses')
      expect(c.templates[0].type).to.equal('mail')
      expect(c.retry).to.be.undefined
      expect(Object.keys(c.sent).length).to.equal(1)
      expect(c.sent[jk._id][0].to).inc(jk.name)
      expect(r.history[0].commId).eqId(c._id)
      expect(r.log.last.action).to.equal('notify:1')
      expect(raw[0]).inc([
        /new message/i])
      send (e2, c2, r2, raw2) ->
        expect(e2).to.be.null
        expect(c2).to.be.null
        expect(r2).to.be.undefined
        expect(raw2).to.be.undefined
        DONE()

