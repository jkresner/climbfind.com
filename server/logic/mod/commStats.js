module.exports = (DAL, Data, DRY) => ({


  exec(cb) {

    DAL.Comm.getManyByQuery({}, {select:'_id type sent retry'}, (e, comms) => {

      var stats = { comm: comms.length, sent: 0, ct: 0, open: 0 }
      var r = {}
      var users = {}

      for (var c of comms) {
        if (!r[c.type]) r[c.type] = []
        if (!stats[c.type]) stats[c.type] = []
        stats[c.type]++

        var day = moment(honey.util.BsonId.toDate(c._id))
        var s = {_id:c._id, day: day.format('DD MMM'), sent: [] }

        if (c.retry) s.retry = c.retry

        for (var u in c.sent) {
          users[u] = users[u] || true
          for (var msg of c.sent[u]) {
            var m = {to:msg.to.replace(/\>/,'').replace(/\</,'<br />')}
            stats.sent++;
            if ((msg.ct||[]).length > 0) {
              for (var click of msg.ct) {
                var wait = moment.duration(moment(honey.util.BsonId.toDate(click._id)).diff(day)/1000,'seconds').humanize()
                m.ct = `<b>${click.link}</b> ${wait}`
                stats.ct++
              }
            }
            if ((msg.open||[]).length > 0) {
              for (var open of msg.open) {
                var wait = moment.duration(moment(honey.util.BsonId.toDate(open._id)).diff(day)/1000,'seconds').humanize()
                m.open = `<i>open ${wait}</i>`
                stats.open++
              }
            }
            s.sent.push(m)
          }
        }

        r[c.type].push(s)
      }

      stats.users = Object.keys(users).length

      cb(null, {stats,comms:r})

    })

  }


})
