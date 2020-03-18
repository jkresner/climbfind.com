module.exports = ({Chat,Post}, {Query,Opts,Project}, DRY) => ({


  validate(user, chat, text, post) {
    if (!text)
      return `Message text required`
    if (!chat && !post)
      return `Message thread required`
    if (chat) {
      let me = _.find(chat.users, u => ID.eq(u._id,user._id))
      if (!me) return `You[${user._id}] are not a participant of chat[${chat._id}]`
    }
  },


  exec(chat, text, post, done) {
    let me = this.user
    let msg = { text, userId: me._id }

    let cb = (e,r) => {
      done(e,{me,chat:r})
      if (!e) TRACK('chat.message', this, r)
    }

    let save = (e,r) => {
      if (e) done(e)
      chat = r || chat
      
      let log = DRY.logAct(chat, 'message', me)
      let history = [msg].concat(((chat||{}).history || []))
      let users = (chat||{}).users || [post.user, me]
      users.forEach(u => u.unread = !_.idsEqual(u._id,me._id))

      if (post) {
        let reply = _.find(history, m => _.idsEqual(m.postId||'', post._id))
        if (!reply) {
          let text = `##### Partner Call for **${moment(post.time).tz(post.tz.id).format('DD MMM')} @ ${post.place.name}**\n\n${post.message}`
          history.unshift({ text, userId:post.user._id, postId:post._id })
          Post.updateSet(post._id, { log: DRY.logAct(post, 'reply', me) }, DRY.noop)
          TRACK('post.reply', this, post)
        }
      }

      if (chat) Chat.updateSet(chat._id, { users, history, log }, cb)
      else Chat.create({ users, history, log }, cb)
    }

    chat 
      ? save()
      : Chat.getByQuery(Query.pair(post.user, me), save)
  },


  project: Project.chat


})
