module.exports = ({Chat,Post}, {Query,Opts,Project}, DRY) => ({


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

    var meta = DRY.touchMeta((chat||{}).meta, 'message', me)
    var users = (chat||{}).users || [post.user, me]
    users.forEach(u => u.unread = !_.idsEqual(u._id,me._id))
    var history = (chat||{}).history || []
    var msg = { text, userId: me._id }

    var cb = (e,r) => {
      done(e,{me,chat:r})
      TRACK('chat.message', this, chat)
    }

    if (post) {
      var existing = _.find(history, m => _.idsEqual(m.postId||'', post._id))
      if (!existing) {
        history.unshift({ text:post.message, userId:post.user._id, postId:post._id })
        TRACK('post.reply', this, post)
        Post.updateSet(post._id, { meta: DRY.touchMeta(post.meta, 'reply', me) }, DRY.noop)
      }
    }



    history.unshift(msg)
    var data = { users, history, meta }
    if (chat)
      return Chat.updateSet(chat._id, data, cb)

    Chat.getByQuery(Query.pair(post.user, me), Opts.chat, (e, r) => {
      if (r)
        Chat.updateSet(r._id, data, cb)
      else
        Chat.create(data, cb)
    })
  },


  project: Project.chat


})
