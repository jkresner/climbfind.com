module.exports = ({Post,Subscription,Comm}, Data, DRY) => ({


  exec(done) {
    var subs = honey.projector.subscriptions
    var routes = honey.projector.routes
    var posts = honey.projector.posts
    var post;
    var opts = {}
    var type = 'posts_notify'
    var comm = { type , sent: {}, templates: [] }
    var tmpls = cache['tmpl_precompile']
    for (var key in tmpls) key.indexOf(type) != 0 ? null
      : comm.templates.push(assign({ key }, _.select(tmpls[key], 'part type')))

    opts.sendUser = {
      ses: u => u.by.email,
      push: u => u.by.push,
      cb: (e, r) => { if (e) comm.retry =
        (comm.retry||[]).concat({ to:r.to._id, key:r.key, e:e.message }) }
    }

    opts.sendUsers = {
      cb(e3, sent) {
        if (e3) return done(e3)
        var raw = []
        sent.forEach(m => {
          comm.sent[m.to._id] = (comm.sent[m.to._id]||[])
            .concat([{ key:m.key, subId: m.to.by._id, msgId: m.messageId, to: m.messageTo }])
          raw.push(m.text)
        })

        var doc = sent.length > 0 ? comm : { data: { post: { _id: post._id }} }

        assign(doc, { type, scheduled: honey.util.BsonId.toDate(post._id) })

        Comm.create(doc, (e4, notify) => {
          if (e4) return done(e4)
          var ups = { meta: DRY.sys.touchMeta(post.meta, `notify:${Object.keys(comm.sent).length}`), 'comm.notify': notify._id }
          Post.updateSet(post._id, ups,
            (e5, r5) => done(e5, e5 ? null : assign(r5,{comm:{notify}}), raw)
          )
        })
      }
    }

    Post.getByQuery(posts.Query.notify, posts.Opts.comm, (e0, r0) => {
      if (e0 || !r0) return done(e0, r0)
      post = r0
      var data = posts.Project.comm(post)
      data.url = routes.Project[type](post)

      assign(comm, { data, tz: post.tz }) //-- todo, smart timezone adjustments

      Subscription.getManyByQuery(subs.Query.notify(post), subs.Opts.comm, (e1, r1) =>
        e1 ? done(e1)
           : COMM.toUsers(subs.Project.notify(r1), opts.sendUsers.cb)
                 .by({ses:1}, opts.sendUser)
                 .send(type, data) )

    })
  },


})
