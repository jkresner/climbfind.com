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
    var msg = { text, userId: me._id }

    var cb = (e,r) => {
      done(e,{me,chat:r})
      TRACK('chat.message', this, r)
    }

    var save = r => {
      r = r || chat
      var log = DRY.logAct(r, 'message', me)
      var users = (r||{}).users || [post.user, me]
      users.forEach(u => u.unread = !_.idsEqual(u._id,me._id))
      var history = (r||{}).history || []
      if (post) {
        var reply = _.find(history, m => _.idsEqual(m.postId||'', post._id))
        if (!reply) {
          history.unshift({ text:post.message, userId:post.user._id, postId:post._id })
          Post.updateSet(post._id, { log: DRY.logAct(post, 'reply', me) }, DRY.noop)
          TRACK('post.reply', this, post)
        }
      }
      history.unshift(msg)

      if (chat) Chat.updateSet(r._id, { users, history, log }, cb)
      else Chat.create({ users, history, log }, cb)
    }

    chat ? save()
         : Chat.getByQuery(Query.pair(post.user, me), (e,r)=>e?cb(e):save(r))
  },


  project: Project.chat


})
