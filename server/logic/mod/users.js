module.exports = (DAL, Data, DRY) => ({


  exec(cb) {

    DAL.User.getManyByQuery({}, {select:'_id name photos.value auth.fb.link auth.fb.gender'}, (e, users) => {

      var stats = {}
      for (var u of users) {
        var sDay = moment(honey.util.BsonId.toDate(u._id)).format('DD MMM')
        if (!stats[sDay]) stats[sDay] = []

        stats[sDay].push({
          signup: sDay,
          name:u.name,
          gender:u.auth.fb.gender,
          fb:u.auth.fb.link,
          avatar:u.photos[0].value})
      }

      cb(null, {stats:Object.values(stats)})

    })

  }


})
