module.exports = ({Chat,User,Comm}, {Project,Query,Opts}, DRY) => ({


  exec(done) {
    var chat, retry = [], data;
    var type = 'chat_message'
    var doc = Project.doc(type)

    var opts = {}
    opts.sendUser = {
      ses: u => u.by.ses,
      push: u => u.by.push,
      cb: (e, r) => { if (e) retry.concat({ to:r.to._id, key:r.key, e:e.message }) }
    }

    opts.sendUsers = {
      cb(e, sent) {
        if (e) return done(e)
        var raw = []
        sent.forEach(m => {
          doc.sent[m.to._id] = (doc.sent[m.to._id]||[])
            .concat([{ key:m.key, subId: m.to.by._id, msgId: m.messageId, to: m.messageTo }])
          raw.push(m.text)
        })

        doc = sent.length > 0 ? assign(doc,{data}) : {data: {chat:{ _id:chat._id}}}
        assign(doc, { type, scheduled: Project.scheduled(chat.history[0]._id) })

        Comm.create(doc, (e4, comm) => {
          if (e4) return done(e4)
          var log = DRY.sys.logAct(chat, `notify:${sent.length}`)
          chat.history[0].commId = comm._id
          Chat.updateSet(chat._id, {log,history:chat.history}, (e5, r5) => {
            done(e5, comm, r5, raw)
          })
        })
      }
    }

    Chat.getByQuery(Query[type], Opts[type], (e, r) => {
      if (e || !r) return done(e, r)
      r.users = r.users.map(u => assign(u, u._id)) //-- attrs rename hack
      chat = r
      data = Project[type](r)
      data.url = Project.url({type,data,_sid:doc._sid})
      COMM.toUsers(Project.chat_to(chat), opts.sendUsers.cb)
          .by({ses:1}, opts.sendUser)
          .send(type, data)

    })
  },


})
