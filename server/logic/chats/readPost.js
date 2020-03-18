module.exports = ({Chat,Post}, {Query,Opts,Project}, DRY) => ({


  validate(user, post) {
    if (ID.eq(user._id, post.user._id))
      return `Can't reply to yourself`
  },


  exec(post, cb) {
    let me = this.user,
      you = post.user;

    let viewed = _.find(post.log.history, 
      t => t.action == 'view' && ID.eq(me._id, t.by._id))
    if (!viewed)
      Post.updateSet(post._id, { log: DRY.logAct(post, 'view', me) }, DRY.noop)

    Chat.getByQuery(Query.pair(you,me), Opts.chat, (e, chat) => {
      if (e) return cb(e)

      let text = `##### Partner Call for **${moment(post.time).tz(post.tz.id).format('DD MMM')} @ ${post.place.name}**\n\n${post.message}`
      let msg = { text, userId: post.user._id, postId: post._id }

      if (!chat)
        chat = { users: [me,you], history: [msg] }
      else {
        let existing = _.find(chat.history, m => ID.eq(m.postId||'',post._id))
        if (!existing)
          chat.history.unshift(msg)
      }

      cb(null, {me,post,chat})
    })
  },


  project: Project.chat


})
