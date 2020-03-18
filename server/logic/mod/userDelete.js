module.exports = (DAL, Data, DRY) => ({


  exec(cb) {
    var jkclimbfind = { _id: "598962e3735a750004278ffe" }
    DAL.User.getById(jkclimbfind._id, (e, u) => {
      if (e || !u) return cb(e, u)

      DAL.Subscription.getManyByQuery({'userId':u._id}, (e, subs) => {
        $log(`Del user.subscriptions[${subs.length}]`)
        DAL.Subscription.bulkOperation([],[], subs.map(s=>({_id:s._id})), DRY.noop)
      })
      DAL.Post.getManyByQuery({'userId':u._id}, (e, posts) => {
        $log(`Del user.posts[${posts.length}]`)
        DAL.Post.bulkOperation([],[], posts.map(p=>({_id:p._id})), DRY.noop)
      })
      DAL.Chat.getManyByQuery({'users._id':u._id}, (e, chats) => {
        $log(`Del user.chats[${chats.length}]`)
        DAL.Chat.bulkOperation([],[], chats.map(c=>({_id:c._id})), DRY.noop)
      })

      cb(null, {})
    })
  }


})
