module.exports = ({Chat}, {Query,Opts,Project}, DRY) => ({


  validate(user, chat) {
    var me = _.find(chat.users, u => _.idsEqual(u._id, user._id))
    if (!me) return `You[${user._id}] are not a participant of chat[${chat._id}]`
  },


  exec(original, cb) {
    var me = this.user
    var {users,meta} = original

    for (var u of users) {
      if (_.idsEqual(u._id, me._id)) {
        if (u.unread)
          meta = DRY.touchMeta(meta, 'read', me)
        u.unread = false
      }
    }

    Chat.updateSet(original._id, { users, meta }, (e,r) =>
      cb(e, { me, chat: assign(r, {users}) }))
  },


  project: Project.chat


})
