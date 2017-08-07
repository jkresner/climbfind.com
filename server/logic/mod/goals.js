module.exports = (DAL, Data, DRY) => ({


  exec(cb) {
    var jkId = "597e2f52755541797ea3d8b7"
    var jk = {}
    var placeIds = Object.keys(cache.places.indoor)
    var hash = {}
    for (var id of placeIds)
      hash[id] = assign(_.select(cache.places.indoor[id], '_id shortName'), {posts: []})

    DAL.Post.getManyByQuery({}, {select:'_id userId placeId log.history.action'}, (e0, posts) => {
      for (var p of posts) {
        var pStats = {
          create: moment(honey.util.BsonId.toDate(p._id)).format('MM.DD'),
          notify: 0,
          view: p.log.history.filter(t => t.action == 'view').length,
          reply: p.log.history.filter(t => t.action == 'reply').length
        }

        p.log.history
         .filter(t => t.action.indexOf('notify:') == 0)
         .map(t => parseInt(t.action.split('notify:')[1]))
         .forEach( n => pStats.notify = pStats.notify + n)

        hash[p.placeId].posts.push(pStats)
        if (_.idsEqual(jkId,p.userId)) {
          if (!jk[p.placeId]) jk[p.placeId] = assign(_.select(cache.places.indoor[p.placeId], '_id shortName'), {posts: []})
          jk[p.placeId].posts.push(pStats)
        }
      }
      DAL.Event.getManyByQuery({name:'visit'}, {select:'_id uId'}, (e1, visits) => {
        var visitStats = { bounce: 0, login: 0, total: visits.length }
        for (var v of visits)
          !!v.uId ? ++visitStats.login : ++visitStats.bounce
        visitStats.coversion = 10000 * ((visitStats.login / visits.length)/100)
        DAL.User.getManyByQuery({}, {select:'_id'}, (e2, users) => {
          var q = {name:'chat.message'} // { _id $gt last week }
          DAL.Event.getManyByQuery(q, {select:'_id uId name'}, (e1, msgs) => {
            var uHash = {}
            for (var m of msgs) uHash[m.uId] = 1
            var userStats = { total: users.length, messaged: Object.keys(uHash).length }
            cb(null, { places: Object.values(hash), jk:Object.values(jk), visits: visitStats, users: userStats })
          })
        })
      })
    })
  }


})
