module.exports = ({Chat,Post}, {Query,Opts,Project}, DRY) => ({


  validate(user, post) {
    if (_.idsEqual(user._id, post.user._id))
      return `Can't reply to yourself`
  },


  exec(post, cb) {
    var me = this.user
    var you = post.user

    var viewed = _.find(post.log.history, t => t.action == 'view' && _.idsEqual(me._id, t.by._id))
    if (!viewed)
      Post.updateSet(post._id, { log: DRY.logAct(post, 'view', me) }, DRY.noop)

    Chat.getByQuery(Query.pair(you,me), Opts.chat, (e, r) => {
      if (e) return cb(e)

      var text = `##### Partner Call for **${moment(post.time).tz(post.tz.id).format('DD MMM')} @ ${post.place.name}**\n\n${post.message}`
      var msg = { text, userId: post.user._id, postId: post._id }

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
