module.exports = ({Chat,Post}, {Query,Opts,Project}, DRY) => ({


  validate(user, post) {
    if (_.idsEqual(user._id, post.user._id))
      return `Can't reply to yourself`
  },


  exec(post, cb) {
    var me = this.user
    var you = post.user

    Post.updateSet(post._id,
      { meta: DRY.touchMeta(post.meta, me,'view') }, DRY.noop)

    Chat.getByQuery(Query.pair(you,me), Opts.chat, (e, r) => {
      if (e) return cb(e)

      var msg = { text: post.message, userId: post.user._id, postId: post._id }

      if (!r)
        r = { users: [me,you], history: [msg] }
      else {
        var existing = _.find(r.history, m => _.idsEqual(m.postId||'',post._id))
        if (!existing)
          r.history.unshift(msg)
      }

      cb(null, {me,post,chat:r})
    })
  },


  project: Project.chat


})
