module.exports = (DAL, {Query,Opts,Project}, DRY) => ({


  exec(cb) {
    var me = this.user
    var opts = assign({}, Opts.list, {sort:{_id:-1}})
    DAL.Subscription.getManyByQuery({userId:me._id}, (e, subscriptions) =>
      DRY.settings.getSet(me._id, undefined, (e1, settings) =>
        DAL.Post.getManyByQuery({userId:me._id}, opts, (e2, posts) =>
          cb(e||e1||e2,{me,settings,posts,subscriptions})
        )
      )
    )
  },


  project: Project.account


})
