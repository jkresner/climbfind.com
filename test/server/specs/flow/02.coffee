{jk_hello} = FIXTURE.post
{micht} = FIXTURE.users
FIXTURE.oauth.micht = micht.auth.fb

DB.removeDocs 'Post', {}, ->
  DB.ensureDocs 'Post', [jk_hello], (r) ->

DB.removeDocs 'Chat', {'users._id':micht._id}, ->

DB.ensureDocs 'User', [micht], (r) ->
  PAGE '/', {}, (html) ->
    expect(html).inc("<h1>Find rock climbing partners")
    LOGIN 'micht', (session) ->
      expect(session).eqId(micht)
      PAGE "/messages", {}, (html2) ->
        expect(html2).inc ["No messages yet"]
        PAGE "/love", {}, (html3) ->
          expect(html3).inc ["<a href='/reply/59841c9f4e4287a2b83bea2a'>Message JK</a>"]
          PAGE "/reply/59841c9f4e4287a2b83bea2a", {}, (html4) ->
            expect(html4).inc ["Partner Call for <strong>05 Aug @ Planet Granite San Francisco</strong>",
                               "<p>Thanks for using Climbfind! </p>",
                               "reply here if you have feedback"]
            data = text: "hello love the site", postId: "59841c9f4e4287a2b83bea2a"
            POST "/chats/message", data, (r1) ->
              # DB.docById('Chat', r1._id, (r1DB) -> OI('r1DB', r1DB))
              expect(r1._id).bsonIdStr()
              expect(r1.users.length).to.equal(2)
              expect(r1.history.length).to.equal(2)
              expect(r1.history[0].text).inc("Partner Call for **05 Aug @ Planet Granite San Francisco**")
              expect(r1.history[1].text).inc("hello love the site")
              GET '/chats/inbox', (r2) ->
                expect(r2.length).to.equal(1)
                expect(r2[0]).eqId(r1)
                data.text = "Ohhh yeah it's really cool thanks"
                POST "/chats/message", data, {}, (r3) ->
                  # DB.docById('Chat', r3._id, (r3DB) -> OI('r3DB', r3DB))
                  expect(r3).eqId(r1)
                  expect(r3.users.length).to.equal(2)
                  expect(r3.history.length).to.equal(3)
                  GET '/chats/inbox', (r4) ->
                    expect(r2.length).to.equal(1)
                    expect(r4[0]).eqId(r1)
                    DONE()
