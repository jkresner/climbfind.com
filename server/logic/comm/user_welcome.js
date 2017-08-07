module.exports = (DAL, {Project,Query,Opts}, DRY) => ({


  exec(done) {
    var type = 'user_welcome'
    var raw = []

    DAL.User.getByQuery(Query[type], Opts[type], (e, r) => {
      if (e || !r) return done(e, r)

      var data = Project.data(type, r)

      COMM.toUser(Project.to(r)).by({ses:1}).send(type, data, (e1, m) => {
        if (e) return done(e)

        var doc = Project.doc(type, data, m)
        doc.sent[m.to._id] = [{ key:m.key, msgId: m.messageId, to: m.messageTo }]
        raw.push()

        DAL.Comm.create(doc, (e2, comm) => {
          var log = DRY.sys.logAct(r, `sys.welcome`)
          log.comm = assign(log.comm||{},{'welcome': comm._id})
          DAL.User.updateSet(r._id, {log}, {select:'_id'}, (e3, r3) => {
            done(e3, comm, r, [m.text])
          })
        })
      })
    })
  }


})
