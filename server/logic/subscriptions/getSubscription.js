module.exports = ({Subscription}, Data, DRY) => ({


  validate(user, subscription) {
    if (!_.idsEqual(user._id, subscription.userId))
      return `Subscription[${subscription._id}] does not belong to you[${user._id}]`
  },


  exec(subscription, cb) {
    cb(null, subscription)
  },


  project: Data.Project.item


})
