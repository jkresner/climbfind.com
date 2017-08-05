module.exports = (app, mw, cfg) =>

  mw.session.orient({
    onFirst: (req, res) => {
      // $log('onFirst' .blue, req.session, req.user)
      TRACK('visit', req, req.session.firstRequest)
    }
  })

