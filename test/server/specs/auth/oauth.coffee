logic = null
tokens = { token: 'blah' }

module.exports = =>

  before ->
    {DAL} = honey.model
    {DRY} = honey.logic
    Data = honey.projector['auth']
    expect(DAL.user).not.null
    expect(DRY).not.null
    expect(Data).not.null
    logic = honey.logic.auth[honey.cfg('auth.oauth.facebook.logic')].chain


  IT "[401] missing token", ->
    logic.call {}, null, 'facebook', {email:'bah'}, {}, (e) ->
      expect(e.status).to.equal(403)
      expect(e.message).inc("Facebook token required")
      DONE()


  IT "[401] missing facebook id", ->
    logic.call {}, null, 'facebook', {email:'bah'}, tokens, (e) ->
      expect(e.status).to.equal(403)
      expect(e.message).inc("Facebook id required")
      DONE()


  IT "[401] silhouette profile pic", ->
    profile = FIXTURE.oauth.silhouette
    logic.call {}, null, 'facebook', profile, tokens, (e) ->
      expect(e.status).to.equal(403)
      expect(e.message).inc("Facebook profile picture required")
      DONE()


  IT "[401] missing email", ->
    LOGIN 'emailnull', {accept:/html/,status:401}, (html) ->
      expect(html).inc("Facebook email required")
      DONE()


  IT "[401] switching facebook accounts", ->
    {jk,ag}  = FIXTURE.users
    profile1 = FIXTURE.oauth.jk
    profile2 = FIXTURE.oauth.ag
    logic.call {user:jk}, jk, 'facebook', profile1, tokens, (e, r) ->
      expect(e).to.be.null
      expect(r.name).to.equal('Jonathon Kresner')
      expect(r.emails.length > 0).to.be.true
      logic.call {user:jk}, jk, 'facebook', profile2, tokens, (e2, r2) ->
        expect(e2.status).to.equal(403)
        expect(e2.message).inc("disallowed")
        expect(r2).to.be.undefined
        DONE()


  IT "Signup on first OAuth", ->
    profile = FIXTURE.oauth.jj
    DB.removeDocs 'user', {'auth.fb.id':profile.id}, ->
      logic.call {}, null, 'facebook', profile, tokens, (e, r) ->
        expect(e).to.be.null
        expect(r.name).to.equal('Jeff Jenks')
        DONE()
