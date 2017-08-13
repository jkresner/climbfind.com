const Views = {
  posts_notify: '_id climbing day user.name user.avatar place.name place.shortName'
}

const Query = {
  user_welcome:   { 'log.comm.welcome': { $exists: false } },
  post_notify:    { 'log.comm.notify': { $exists: false } },
  post_notify_subs: post => {
    var q =       { beat:'instant',
                    placeId: post.place._id,
                    userId: { $ne: post.userId || post.user._id } }
    q[post.place.type] = true
    return q
  },
  chat_message:   { 'history.0.commId': { $exists: false },
                    'history.0.postId': { $exists: false }  },

}

const Opts = {
  user_welcome: { select:'_id name emails photos log', sort: { _id: 1 } },
  post_notify: { select: `_id time type tz climbing message userId placeId log`,
          sort: { _id: 1 },
          join: { userId: '_id name photos' } },
  post_notify_subs: { select: `_id userId placeId indoor outdoor email push beat`,
          join: { userId: '_id name emails photos' } },
  chat_message: { sort: { 'history.0._id': 1 },
          join: { 'users._id': 'settings emails' } },
}

const Projections = ({select,util,id},{chain,view}) => ({


  doc: type => {
    var _id = id.new()
    var _sid = util.BsonId.toCompare(_id).toString(36)
    var doc = chain({_id,_sid,type,sent:{}},'templates')
    doc.transports = {}
    for (var template of doc.templates) {
      var transport = template.key.split(':')[1]
      doc.transports[transport] = 1
    }
    return doc
  },

  url: ({_sid,data,type}) => {
    // var r = assign(chain(d, type))
    // $log('Project.url', type, _sid, d)
    // var url =
    // for (var name in url)
      // r.url[name] = assign(url[name]||{},
        // { [transport]:`${config.http.host}/${transport}/${name}/${_sid}`})
    // }
    return chain(assign({_sid}, data), `routes.${type}`)
  },

  scheduled: id =>
    util.BsonId.toDate(id),


  templates: d => {
    var r = []
    var tmpls = cache['tmpl_precompile']
    for (var key in tmpls)
      key.indexOf(d.type) != 0 ? null
       : r.push(assign({ key }, _.select(tmpls[key], 'part type')))
    return assign(d, { templates: r })
  },


  // opts: (transports, toUserCallback) => {
  //   var opts = { toUser : { cb: toUserCallback }, toUsers: {} }
  //   transports.split(' ').forEach(
  //     transport => opts.toUser[transport] = u => u.by[transport] )
  //   return opts
  // },


  //----------------------------------------------------/


  to: u =>
    assign(chain(u, 'auth.comm'), { by: { ses: 1 } }),


  sub_to: s =>
    assign(chain(s.user, 'auth.comm'),
      { by: { _id: s._id, ses: s.email, push: s.push } }),


  chat_to: d =>
    d.users.filter(u => !_.idsEqual(u._id, d.history[0].userId))
      .map(u => assign(chain(u, 'auth.comm'), {
        by: _.select(chain(u.settings, 'settings.defaults').notify.messages, 'email push') }))
      .map(u => assign(u, {by: { ses: u.by.email, push: u.by.push }})),


  user_welcome: d =>
    ({ user: select(d, '_id name') }),


  post_notify: d => {
    var post = chain(d, 'posts.user', 'posts.place', 'posts.localDay', view.posts_notify)
    return { post }
  },

  chat_message: d => ({
    chat: { _id: d._id },
    message: {
      text: d.history[0].text,
      user: select(_.find(d.users,u=>_.idsEqual(u._id,d.history[0].userId)), 'name avatar') }
  }),

})

module.exports = { Views, Query, Opts, Projections }
