module.exports = ({User,Comm}, {Project,Query,Opts}, DRY) => ({


  exec(_sid, link, done) {
    var {user,url} = this
    var by = url.split('/')[1]
    var query = { _sid }
    query[`data.url.${link}.${by}`] = { $exists: true }
    Comm.getByQuery(query, (e,r) => {
      if (e || !r) return done(e, r)
      var key = `${r.type}:${by}`
      var {sent} = r
      for (var m of sent[user._id]) {
        if (m.key == key) {
          m.ct = m.ct || []
          if (!_.find(m.ct, click => click.link == link))
            m.ct.push({_id: Comm.newId(), link })
        }
      }
      Comm.updateSet(r._id, {sent}, (e1, r1) =>
        done(e1, { url: r.data.url[link].to })
      )
    })
  },


  project: d => d

})
