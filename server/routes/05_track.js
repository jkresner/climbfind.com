module.exports = (app, mw, {track}) => {

  if (!track.on) return


  var opts = { comm: track.comm }
  opts.comm.static.dir =
    honey.cfg(`templates.dirs.${track.comm.static.dir}`)[0]


  honey.Router('tracked', {type: 'static'})

    .use(mw.$.session)

    .get('/ses/:link/:comm',
      mw.$.authd,
      mw.$.pd('comm.logCT'),
      (req, res) => res.redirect(req.locals.r.url))

    .static(`/`,
      mw.$.pd('comm.logOpen', { params:['url'] }),
      opts.comm.static)

}
