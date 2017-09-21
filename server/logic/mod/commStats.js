var filterOut = ["597e2f52755541797ea3d8b7","598962e3735a750004278ffe"]
var waited = (sent, act) =>  moment
  .duration(moment(honey.util.BsonId.toDate(act._id))
  .diff(sent)/1000,'seconds').humanize()
  .replace(" days", "d").replace(" day", "d")
  .replace(" hours", "h").replace(" hour", "h")
  .replace(" minutes", "m")
  .replace(" seconds", "s")
  .replace("a few", "few ")
  .replace("an", "1").replace("a", "1")


module.exports = (DAL, Data, DRY) => ({


  exec(cb) {

    DAL.Comm.getManyByQuery({}, { select:'_id type sent retry data.post.place.shortName' }, (e, rComms) => {
      var comms = rComms.filter(c =>
        filterOut.indexOf(Object.keys(c.sent||{a:[]})[0]) == -1
        || Object.keys(c.sent||{}).length > 1
      )

      var stats = { comm: comms.length, sent: 0, ct: 0, open: 0 }
      var r = {}
      var users = {}

      for (var c of comms) {
        if (!r[c.type]) r[c.type] = []
        if (!stats[c.type]) stats[c.type] = []
        stats[c.type]++

        let day = moment(honey.util.BsonId.toDate(c._id))
        let s = {_id:c._id, day: day.format('DDMM'), sent: [] }
        let ct = 0, open = 0;

        if (c.retry) s.retry = c.retry

        for (var u in c.sent) {
          users[u] = users[u] || true
          for (var msg of c.sent[u]) {
            let to = msg.to.split('<')[1].split('@')[0]
            var m = { to }
            stats.sent++;
            if ((msg.ct||[]).length > 0) {
              m.ct = m.ct || ''
              for (var click of msg.ct) {
                m.ct += `<i><span class="glyphicon glyphicon-hand-up"></span>${waited(day, click)}</i>`
                ct++
              }
            }
            if ((msg.open||[]).length > 0) {
              m.open = m.open || ''
              for (var opn of msg.open) {
                m.open += `<i><span class="glyphicon glyphicon-folder-open
"></span>${waited(day, opn)}</i>`
                open++
              }
            }
            s.sent.push(m)
          }
        }

        stats.ct += ct
        stats.open += open
        if (Object.keys(c.sent||{a:[]}).length <= ct)
          s.css = "success"
        else if ((ct + open) > 0)
          s.css = "info"

        if (c.type == 'post_notify' && c.data.post.place) {
          s.place = c.data.post.place.shortName.substr(0,15)
          $log('post_notify:s', s, c.sent)
          r[c.type].push(s)
        }
        else if (c.type != 'post_notify')
          r[c.type].push(s)
        // s.sent.reverse()
      }

      stats.users = Object.keys(users).length
      for (let type in r)
        r[type].reverse()

      cb(null, {stats,comms:r})

    })

  }


})
