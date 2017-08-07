module.exports = ({Chat}, {Query,Opts,Project}, DRY) => ({


  validate(user, chat) {
    var me = _.find(chat.users, u => ID.eq(u._id, user._id))
    if (!me) return `You[${user._id}] are not a participant of chat[${chat._id}]`
  },


  exec(original, cb) {
    var me = this.user
    var {users} = original
    var log = null

    for (var u of users) {
      if (ID.eq(u._id, me._id)) {
        if (u.unread)
          log = DRY.logAct(original, 'read', me)
        u.unread = false
      }
    }

    var ups = {users}
    if (log) assign(ups,{log})
    Chat.updateSet(original._id, ups, (e,r) =>
      cb(e, { me, chat: assign(r, {users}) }))
  },


  project: Project.chat


})
