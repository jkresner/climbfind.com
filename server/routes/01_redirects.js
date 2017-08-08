module.exports = (app, mw) =>


  honey.Router('redirects', {type: 'html'})
    .use(mw.$.session)
    .use(mw.$.noindex)
    .use(mw.$.authd)

    .get('/ses/:link/:comm', mw.$.logic('comm.logOpen'),
      (req, res, next) => res.redirect(req.locals.r.url))
