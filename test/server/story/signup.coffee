module.exports = (key, done) ->
  
  uniqueKey = FIXTURE.uniquify('oauth', key, 'id name email last_name first_name')
  
  LOGIN uniqueKey, (session) ->
    done session, uniqueKey

  uniqueKey