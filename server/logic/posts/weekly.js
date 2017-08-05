module.exports = ({Post,Subscription,Comm}, {Query,Opts,Project}, DRY) => ({


  exec(cb) {
    // var type = 'posts_weekly'
    // var comm = { type , sent: {}, templates: [] }
    // var tmpls = cache['tmpl_precompile']
    // for (var key in tmpls) key.indexOf(type) != 0 ? null
    //   : comm.templates.push(assign({ key }, _.select(tmpls[key], 'part type')))

    // opts.sendUser = {
    //   ses: u => u.by.email,
    //   push: u => u.by.push,
    //   cb: (e, r) => { if (e) comm.retry =
    //     (comm.retry||[]).concat({ to:r.to._id, key:r.key, e:e.message }) }
    // }1

    // opts.sendUsers = {
    //   cb(e3, sent) {
    //     if (e3) return cb(e3)
    //     var raw = []
    //     sent.forEach(m => {
    //       comm.sent[m.to._id] = (comm.sent[m.to._id]||[])
    //         .concat([{ key:m.key, subId: m.to.by._id, msgId: m.messageId, to: m.messageTo }])
    //       raw.push(m.text)
    //     })

    //     $log('notify.comm.create'.blue, comm)
    //     Comm.create(comm, (e4, notify) => {
    //       if (e4) return cb(e4)
    //       var ups = { meta: DRY.sys.touchMeta(post.meta, `notify:${Object.keys(comm.sent).length}`), 'comm.notify': notify._id }
    //       Post.updateSet(post._id, ups,
    //         (e5, r5) => cb(e5, e5 ? null : assign(r5,{comm:{notify}}), raw)
    //       )
    //     })
    //   }
    // }

    // var subs = honey.projector.subscriptions
    // var routes = honey.projector.routes

    // Post.getByQuery(Query.notify, Opts.comm, (e0, r0) => {
    //   if (e0 || !r0) return cb(e0, r0)
    //   $log('notify.post'.blue, r0._id)
    //   post = r0
    //   var data = Project.comm(post)
    //   data.url = routes.Project[type](post)

    //   //-- todo, smart timezone adjustments
    //   assign(comm, { data, tz: post.tz,
    //     scheduled: honey.util.BsonId.toDate(post._id) })

    //   Subscription.getManyByQuery(subs.Query.notify(post), subs.Opts.comm, (e1, r1) =>
    //     e1 ? cb(e1)
    //        : COMM.toUsers(subs.Project.notify(r1), opts.sendUsers.cb)
    //              .by({ses:1}, opts.sendUser)
    //              .send(type, data) )

    // })
  }


})
