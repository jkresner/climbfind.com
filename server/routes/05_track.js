module.exports = (app, mw, {track}) => {

  if (!track.on) return

  let dir = honey.cfg(`templates.dirs.comm`)[0]

  honey.Router('tracked', {type:'static'})

    .use(mw.$.session)

    .get('/ses/:link/:comm',
      mw.$.authd,
      mw.$.pd('comm.logCT'),
      (req, res) => res.redirect(req.locals.r.url))

    .get(['/ses/logo.jpg'
      ],
      mw.$.pd('comm.logOpen', { params:['url'] }),
      (req, res) => res.sendFile(join(dir, req.path)))

}
