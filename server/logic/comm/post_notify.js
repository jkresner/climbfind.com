module.exports = ({Post,Subscription,Comm}, {Query,Opts,Project}, DRY) => ({


  exec(done) {
    var type = 'post_notify'
    var retry = [], raw = [], data = {}, sent = {}, post = null;
    var doc = Project.doc(type)

    var opts = { toUsers: {} }
    opts.toUser = {
      ses: u => u.by.ses,
      push: u => u.by.push,
      cb: (e, r) => !e ? raw.push(r.text)
         : retry.push({ e:e.message, key:r.key, to:r.to._id }) }

    opts.toUsers.cb = (e, r) => {
      if (e && (!r || r.length == 0)) return done(e)

      r.forEach(m => sent[m.to._id] = (sent[m.to._id]||[])
        .concat([{ _id: m._id, key:m.key, subId: m.to.by._id, msgId: m.messageId, to: m.messageTo }]))

      if (r.length == 0)
        doc = { type, data:{post:{_id:post._id}} }
      else
        assign(doc, {data,sent,tz:post.tz,scheduled: Project.scheduled(post._id)})


      if (retry.length > 0)
        assign(doc, {retry})

      Comm.create(doc, (e, comm) => {
        if (e) return done(e)
        var log = DRY.sys.logAct(post, `notify:${r.length}`)
        log.comm = assign(log.comm||{}, {notify:comm._id})
        Post.updateSet(post._id, {log}, (e5, r5) => done(e5, comm, r5, raw))
      })
    }


    Post.getByQuery(Query[type], Opts[type], (e, r) => {
      if (e || !r) return done(e, r)
      post = r
      data = Project[type](r)
      data.url = Project.url({type,data,_sid:doc._sid})
      Subscription.getManyByQuery(Query[`${type}_subs`](r),
        Opts[`${type}_subs`], (e, subs) =>

          e ? done(e)
            : COMM.toUsers(Project.sub_to(subs), opts.toUsers.cb)
                  .by({ses:1}, opts.toUser)
                  .send(type, data))

    })
  },


})
