module.exports = (DAL, {Query,Opts,Project}, DRY) => ({


  exec(cb) {
    var latest = done => DAL.Post.getManyByQuery({}, Opts.list, done)
    var {user} = this

    cache.get('latest', latest, (e, latest) => {
      if (e || !user) return cb(e, {subscriptions:[],posts:latest})

      DAL.Subscription.getManyByQuery({userId:user._id}, (e, subscriptions) => {
        if (e || subscriptions.length == 0)
          return cb(e, { subscriptions, posts: [] })

        DAL.Post.getManyByQuery(Query.list(subscriptions), Opts.list, (ee, posts) =>
          cb(ee, {subscriptions,posts}))
      })
    })
  },


  project: Project.list


})
