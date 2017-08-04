module.exports = ({Chat}, {Query,Opts,Project}, DRY) => ({


  validate(user, chat, text, post) {
    if (!text)
      return `Message text required`
    if (!chat && !post)
      return `Message thread required`
    if (chat) {
      var me = _.find(chat.users, u=> _.idsEqual(u._id,user._id))
      if (!me) return `You[${user._id}] are not a participant of chat[${chat._id}]`
    }
  },


  exec(chat, text, post, done) {
    var me = this.user

    var meta = DRY.touchMeta((chat||{}).meta, 'send', me)
    var users = (chat||{}).users || [post.user, me]
    users.forEach(u => u.unread = !_.idsEqual(u._id,me._id))
    var history = (chat||{}).history || []
    var msg = { text, userId: me._id }

    if (post) {
      var existing = _.find(history, m => _.idsEqual(m.postId||'',post._id))
      if (!existing)
        history.unshift({ text:post.message, userId:post.user._id, postId:post._id })
    }

    history.unshift(msg)

    var cb = (e,r) => done(e,{me,chat:r})

    if (chat)
      Chat.updateSet(chat._id, { users, history, meta }, cb)
    else
      Chat.create({users, history, meta }, cb)
  },


  project: Project.chat


})
