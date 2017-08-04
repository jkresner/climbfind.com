module.exports = (DAL, {Query,Opts,Project}, DRY) => ({


  exec(cb) {
    var me = this.user
    var opts = assign({}, Opts.list, {sort:{_id:-1}})
    DAL.Subscription.getManyByQuery({userId:me._id}, (e, subscriptions) => {
      DAL.Post.getManyByQuery({userId:me._id}, opts, (e,r) => cb(e,{me,posts:r,subscriptions}))
    })
  },


  project: Project.account


})
