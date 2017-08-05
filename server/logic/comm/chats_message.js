module.exports = ({Chat,User,Comm}, Data, DRY) => ({


  exec(done) {
    var {settings,chats,routes} = honey.projector
    var chat;
    var opts = {}
    var type = 'chats_message'
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

        var doc = sent.length > 0 ? comm : { data: { chat: { _id: chat._id }} }

        assign(doc, { type, scheduled: honey.util.BsonId.toDate(chat.history[0]._id) })

        Comm.create(doc, (e4, comm) => {
          if (e4) return done(e4)
          var meta = DRY.sys.touchMeta(chat.meta, `notify:${Object.keys(comm.sent).length}`)
          chat.history[0].commId = comm._id
          Chat.updateSet(chat._id, {meta,history:chat.history}, (e5, r5) => {
            if (e5) return done(e5)
            r5.history[0].comm = comm
            done(null, r5, raw)
          })
        })
      }
    }

    Chat.getByQuery(chats.Query.notify, chats.Opts.comm, (e0, r0) => {
      if (e0 || !r0) return done(e0, r0)
      r0.users = r0.users.map(u => assign(u, u._id)) //-- attr renaming hack
      chat = r0
      var data = chats.Project.comm(chat)
      data.url = routes.Project[type](chat)

      assign(comm, { data })

      COMM.toUsers(chats.Project.notify(chat), opts.sendUsers.cb)
          .by({ses:1}, opts.sendUser)
          .send(type, data)

    })
  },


})
