module.exports = ({User,Comm}, {Project,Query,Opts}, DRY) => ({


  validate() {},


  exec(url, done) {
    var cb = e => done(e, {})
    var [path,key] = url.split('c=')
    var [_sid,sentId] = (key||'').split(':')
    if (!_sid || !sentId) return cb()

    var query = { _sid }
    Comm.getByQuery(query, (e,r) => {
      if (e || !r) return cb(e)
      var openId = null
      var {sent} = r
      for (var uId in sent) {
        for (var m of sent[uId]) {
          if (_.idsEqual(m._id, sentId)) {
            openId = Comm.newId()
            m.open = m.open || []
            m.open.push({_id:openId})
          }
        }
      }
      if (openId)
        Comm.updateSet(r._id, {sent}, (e1, r1) => cb(e1))
      else
        cb()
    })
  },


  project: d => d

})
