module.exports = (app, mw, {redirects}) =>

  !redirects.on ? 0 : honey

    .Router('redirects', {type: 'html'})

    .get(['/images/*',
          '/mobile',
          '/opinion*',
          '/page-not-found.htm',
          '/moderator-dashboard',
          '/thumb.ashx*'],
      (req, res, next) => res.status(410).send(''))

    .get('/ico/*',
      (req, res, next) => res.redirect(301, req.originalUrl.replace('\/ico','')))

    .get('/apple-touch-*',
      (req, res, next) => res.redirect(301, req.originalUrl.replace('touch-','')))

    .get(['/apple-icon-120x120-precomposed.png',
          '/apple-icon-152x152-precomposed.png'],
      (req, res, next) => res.redirect(301, req.originalUrl.replace('-precomposed','')))

    .get(['/Climbing-Grade-Comparison-Chart-Converter',
          '/climbing-partners',
          '/search-for-rock-climbing-partners',
          '/world-climbing-map',
          '/-world-rock-climbing',
          '/world-rock-climbing'],
      (req, res, next) => res.redirect('/'))

    .get(['/climb/*',
          '/climbing-around/*',
          '/climber/*',
          '/climber-profile/*',
          '/ClimberProfiles/Me',
          '/indoor-climbing-*',
          '/Feature-Article/*',
          '/Media/Add/*',
          '/media/indoor-climbing-*',
          '/media/outdoor-climbing-*',
          '/media/rock-climbing-*',
          '/my-climbing-feed',
          '/new-partner-call/*',
          '/outdoor-climbing-*',
          '/partners-rss-feed/*',
          '/places',
          '/places/indoor-rock-climbing-gyms/*',
          '/places/outdoor-rock-climbing/*',
          '/rock-climbing-*',
          '/team'],
      (req, res, next) => res.redirect(301, '/'))

    .use(mw.$.session)
    .use(mw.$.noindex)
    .use(mw.$.authd)

    .get('/ses/:link/:comm', mw.$.logic('comm.logOpen'),
      (req, res, next) => res.redirect(req.locals.r.url))
