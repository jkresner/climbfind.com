module.exports = (DAL, {Query,Opts,Project}, DRY) => ({


  exec(cb) {
    var {user} = this
    if (!user)
      DAL.Post.getManyByQuery({}, Opts.list, (e,r) => cb(e,{posts:r}))
    else
      DAL.Subscription.getManyByQuery({userId:user._id}, (e, subscriptions) => {
        if (e || subscriptions.length == 0) return cb(e,[])
        DAL.Post.getManyByQuery(Query.list(subscriptions), Opts.list, (ee, posts) => {
          cb(ee, {subscriptions,posts})
        })
      })
  },


  project: Project.list


})
