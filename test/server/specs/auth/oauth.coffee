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
    logic = honey.logic.auth[honey.cfg('auth.oauth.facebook.logic')]
    expect(logic.validate).not.null
    expect(logic.exec).not.null
    expect(logic.project).not.null


  IT "[401] missing token", ->
    logic.exec 'facebook', {email:'bah'}, {}, (e) ->
      expect(e.status).to.equal(401)
      expect(e.message).inc("Facebook token required")
      DONE()


  IT "[401] missing facebook id", ->
    logic.exec 'facebook', {email:'bah'}, tokens, (e) ->
      expect(e.status).to.equal(401)
      expect(e.message).inc("Facebook id required")
      DONE()


  IT "[401] silhouette profile pic ", ->
    profile = FIXTURE.oauth.silhouette
    logic.exec 'facebook', profile, tokens, (e) ->
      expect(e.status).to.equal(401)
      expect(e.message).inc("Facebook profile picture required")
      DONE()


  IT "[401] switching facebook accounts", ->
    profile1 = FIXTURE.oauth.jk
    profile2 = FIXTURE.oauth.ag
    logic.exec 'facebook', profile1, tokens, (e, r) ->
      expect(e).to.be.null
      expect(r.name).to.equal('Jonathon Kresner')
      expect(r.emails.length > 0).to.be.true
      logic.exec.call {user:r}, 'facebook', profile2, tokens, (e2, r2) ->
        expect(e2.status).to.equal(401)
        expect(e2.message).inc("disallowed")
        expect(r2).to.be.undefined
        DONE()


  IT "Signup on first OAuth", ->
    profile = FIXTURE.oauth.ag
    DB.removeDocs 'user', {'auth.fb.id':'444405405104'}, ->
      logic.exec 'facebook', profile, tokens, (e, r) ->
        expect(e).to.be.null
        expect(r.name).to.equal('Andrew Grosser')
        DONE()
