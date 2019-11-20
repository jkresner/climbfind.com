rw = null
send_user_welcome = null

module.exports = ->

  DESCRIBE "ses", ->

    before (done) ->
      send_user_welcome = honey.logic.comm.user_welcome.exec
      rw = FIXTURE.oauth.rw
      qRemove = 'emails.value': { $or: [rw.email] }
      DB.removeDocs 'User', qRemove, (r0) ->
        done()

    IT "user_welcome => open + click through", ->
      LOGIN 'rw', (s) ->
        expect(s._id).bsonIdStr()
        expect(s.name).to.equal(rw.name)
        send_user_welcome (e, c, r, raw) ->
          expect(e).to.be.null
          expect(c._id).bsonId()
          expect(c._sid).to.exist
          expect(c.templates[0].key).to.equal('user_welcome:ses')
          expect(c.type).to.equal('user_welcome')
          expect(Object.keys(c.sent).length).to.equal(1)
          expect(c.sent[s._id]).to.exist
          expect(c.sent[s._id].length).to.equal(1)
          expect(c.sent[s._id][0]._id).bsonId()
          expect(c.sent[s._id][0].open).to.be.undefined
          expect(c.sent[s._id][0].ct).to.be.undefined
          expect(c.data.user.name).to.equal(rw.name)
          expect(c.data.url.img.logo_ses).to.exist
          url =
            open: { img: "/ses/logo.jpg?c=#{c._sid}:#{c.sent[s._id][0]._id}" }
            click: { post: "/ses/post/#{c._sid}" }
          expect(c.data.url.img.logo_ses+"#{c.sent[s._id][0]._id}").inc(url.open.img)
          expect(c.data.url.post.ses).inc(url.click.post)
          expect(raw[0]).inc([
            url.open.img,
            url.click.post
          ])
          PAGE url.open.img, {contentType:/image/,status:200}, (img) ->
            DB.docById 'Comm', c._id, (r1) ->
              expect(r1.sent[s._id][0].open).to.exist
              expect(r1.sent[s._id][0].ct).to.be.undefined
              REDIRECT url.click.post, {contentType:/text/}, (text) ->
                DB.docById 'Comm', c._id, (r2) ->
                  expect(r2.sent[s._id][0].open).to.exist
                  expect(r2.sent[s._id][0].ct).to.exist
                  DONE()

    IT.skip "post_notify => open + click through", ->


