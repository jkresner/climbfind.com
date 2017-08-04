module.exports = (DAL, Data, DRY) => ({


  exec(cb) {
    var q = { userId: this.user._id }
    DAL.Subscription.getManyByQuery(q, Data.Opts.list, cb)
  },


  project: Data.Project.list


})
