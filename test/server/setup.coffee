module.exports = (e) ->

  console.log('SCREAM.setup ' +  if e? then "fail #{e.message}".red else "done")


  global.expectPostCopy = (post, msg) ->
    expect(msg._id).eqId(post._id)
    expect(msg.text).to.inc(post.message)
    expect(msg.user.name).to.equal(post.user.name)
    # expect(msg.user.avatar).to.equal(post.user.avatar)


  global.expectLog = (model, id, actions) ->
    actions = actions.split(' ')
    DB.docById model, id, (r) ->
      {history} = r.log
      expect(history.length, "#{model}[#{id}] history.length[#{history.length}] != #{actions}").to.equal(actions.length)
      for idx in [0..actions.length-1]
        expect(history[idx].action, "#{model}[#{id}] history[#{idx}] != #{actions[idx]}").to.equal(actions[idx])


  DB.clearCollections = (names, success) ->
    if !success
      success = names
      names = _.without(OPTS.config.db.mongo.collections, "template", "place")
    else
      names = names.split(' ')

    fns = names.map((name) -> (cb) -> DB.removeDocs(name, {}, cb))
    $log('DB.clear', names.join('|'))
    AFTER(fns, success)

    # DB.removeDocs 'session', {}, ->
    #   DB.removeDocs 'event', {}, ->
    #     DB.removeDocs 'post', {}, ->
    #       DB.removeDocs 'subscription', {}, ->
    #         DB.removeDocs 'comm', {}, ->
    #           DB.removeDocs 'route', {}, ->
    #             DB.removeDocs 'chat', {}, ->
    #               DB.removeDocs 'user', {}, ->
    #                 cb()


  DB.resetCollections = (success) ->
    DB.clearCollections (r) ->
      DB.ensureDocs 'User', [FIXTURE.users.jk], ->
        DB.ensureDocs 'Post', [FIXTURE.post.jk_hello], ->
          success()
