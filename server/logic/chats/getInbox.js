module.exports = ({Chat}, {Query,Opts,Project}, DRY) => ({


  exec(cb) {
    var me = this.user
    Chat.getManyByQuery(Query.inbox(me), Opts.inbox,
      (e,r) => cb(e, { me, chats:r }))
  },


  project: Project.inbox


})
