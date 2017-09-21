module.exports = (cb) ->


  global.expectPostCopy = (post, msg) ->
    expect(msg._id).eqId(post._id)
    expect(msg.text).to.inc(post.message)
    expect(msg.user.name).to.equal(post.user.name)
    # expect(msg.user.avatar).to.equal(post.user.avatar)


  global.expectLog = (model, id, actions, comm) ->
    actions = actions.split(' ')
    comm = if comm? then comm.split(' ') else []
    DB.docById model, id, (r) ->
      {history} = r.log
      expect(history.length, "#{model}[#{id}] history.length[#{history.length}] != #{actions}").to.equal(actions.length)
      for idx in [0..actions.length-1]
        expect(history[idx].action, "#{model}[#{id}] history[#{idx}] != #{actions[idx]}").to.equal(actions[idx])
      for cm in comm
        expect(r.log.comm[cm], "#{model}[#{id}] comm[#{cm}] undefined").to.exist

  global.$history = (doc, type) ->
    expect(doc.log, "doc.log missing #{doc}").to.exist
    expect(doc.log.history, "doc.log.history missing #{doc}").to.exist
    {history} = doc.log
    console.log("#{type}[#{doc._id}]".cyan)
    for idx in [0..history.length-1]
      act = history[idx]
      console.log("#{idx} #{act._id}".dim, honey.util.BsonId.toDate(act._id), act.action.cyan, "\t#{act.by.name}<#{act.by._id}>")


  DB.clearCollections = (names, success) ->
    if !success
      success = names
      names = _.without(OPTS.config.db.mongo.collections, "template", "place")
    else
      names = names.split(' ')

    fns = names.map((name) -> (cb) -> DB.clear(name, cb))
    $log('DB.clear'.yellow.dim, "(#{names.join('|')})".gray.dim)
    WHEN(fns, success)


  DB.resetCollections = (success) ->
    DB.clearCollections (r) ->
      {jk,ag} = FIXTURE.users
      DB.ensureDocs 'User', [jk,ag], ->
        DB.ensureDocs 'Post', [FIXTURE.post.jk_hello], ->
          success()

  DB.resetCollections(cb)
