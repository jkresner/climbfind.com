var project = {
  posts: (req, getter) => {
    let posts = _.get(req.locals, getter)
    posts.forEach(p => p.me = req.user ? _.idsEqual(p.user._id, req.user._id) : false)
    req.locals.feed = {}
    if (posts.length > 0)
      req.locals.feed.onlyme = posts.filter(p=>!p.me).length == 0
    if (posts.length == 0 || !req.user)
      req.locals.feed.nosubscriptions = true
  },
  chat: (req, getter) => {
    var chat = _.get(req.locals, getter)
    chat.users = chat.users.filter(u => !_.idsEqual(u._id, req.user._id))
    for (var m of chat.history) {
      if (_.idsEqual(m.user._id, req.user._id)) delete m.user.avatar
    }
  }
  //, country: ()
  //   req.locals.country = Object.keys(CAL.places.country)
  //      .map(name => {
  //        let areas = CAL.places.country[name]
  //           .map(id => ({ name: CAL.places.area[id].name.replace(`, ${name}`,'') }))
  //        return { name, areas, count: areas.length }
  //      })
  // }
}


module.exports = (app, mw) =>

  view =>

    function(req, res, next) {
      if (view == "chat") project.chat(req, 'r')
      if (view == "account") project.posts(req, 'r.posts')
      if (view == "home") project.posts(req, 'r.posts')
      // if (view == "home") project.country(req)

      if (view == "love" || view == "home") {

        let htmlHead = {
          ogTitle: 'Climbfind climbing partner community',
          ogDescription: 'Find climbing partners at your local climbing gym and weekend climbing & hiking trips outdoors',
          ogImage: 'https://www.climbfind.com/img/og2x.png',
          ogUrl: 'https://www.climbfind.com/',
          canonical: 'https://www.climbfind.com/'
        }
        if (/apple/i.test(req.ctx.ud)) htmlHead.apple = true
        if (/android/.test(req.ctx.ud)) htmlHead.android = true
        if (/ms/.test(req.ctx.ud)) htmlHead.ms = true

        req.locals.htmlHead = htmlHead
      }

      return mw.res.page(view, { layout:'layout', view })(req, res, next)
    }

