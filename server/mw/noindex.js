module.exports = (app, mw) =>

  (req, res, next) =>
    next(null, assign(req.locals,{noindex:true}))
