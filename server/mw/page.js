var project = {
  posts: (req, getter) => {
    var posts = _.get(req.locals,getter)
    posts.forEach(p => p.me = !req.user || _.idsEqual(p.user._id, req.user._id))
    req.locals.feed = { onlyme: posts.filter(p=>!p.me).length == 0 }
  }
}


module.exports = (app, mw) =>

  view =>

    function(req, res, next) {
      if (view == "home") project.posts(req, 'r')
      if (view == "account") project.posts(req, 'r.posts')

      return mw.res.page(view, { layout:'layout', view })(req, res, next)
    }
