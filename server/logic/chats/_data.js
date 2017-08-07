const Views = {
  chat:       '_id users history',
  inbox:      '_id unread title with._id with.name with.avatar last',
}


const Query = {
  inbox: (me) => ({'users._id': me._id }),
  group: (users) => ({ $and: user.map(u=>({'users._id': u._id})) }),
  pair: (you, me) => ({ $and: [{'users._id': you._id},
                               {'users._id': me._id }] })
}


const Opts = {
  inbox: { select: '_id users history' }
}


const Projections = ({select,util,id},{chain,view}) => ({


  user: u =>
    assign({unread:true}, chain(u,'auth.session')),


  history: d => {
    var umap = {}
    d.users.forEach( u => umap[u._id] = select(u, '_id name avatar') )
    return assign(d, { history: d.history.map(m =>
      ({ _id:m.postId||m._id, text:m.text, user:umap[m.userId] })) })
  },


  chat: d => {
    var r = chain(d.chat, 'history', view.chat)
    r.history.reverse()
    r._id = d.chat._id
    if (d.post) r.postId = d.post._id
    return r
  },


  last: d =>
    assign(d, { last: d.history[0] }),


  inbox: d => {

    d.chats.map(t => assign(t, {
      'with': t.users.filter(u => !_.idsEqual(d.me._id,u._id)),
      'unread': t.users.filter(u => _.idsEqual(d.me._id,u._id))[0].unread,
      'history': [t.history[0]]
    })).forEach(c => c.title = c.with[0].name)

    var r = chain(d.chats, 'history', 'last', view.inbox)
    r.sort()
    r.filter(c => _.idsEqual(c.last.user._id, d.me._id))
     .forEach(c => c.last.text = "You: " + c.last.text)

    return r.length == 0 ? { empty: true } : id.sort(r, 'last._id')
  }

})

module.exports = { Views, Query, Opts, Projections }
