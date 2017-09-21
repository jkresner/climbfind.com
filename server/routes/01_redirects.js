module.exports = (app, mw, {redirects}) =>

  !redirects.on ? 0 : honey

    .Router('redirects', {type: 'html'})


    //-- 410 Gone
    .get(['/assets/*',
          '/certificate',
          '/images/*',
          '/mobile',
          '/moderator*',
          '/opinion*',
          '/post*',
          '/page-not-found.htm',
          '/team',
          '/thumb.ashx*'
      ], (req, res) => res.status(410).type('text').send(''))


    //-- 302 urls possibly one day might reuse
    .get(['/Climbing-Grade-Comparison-Chart-Converter',
          '/climbing-partners',
          '*-climbing-partners*',
          '/Glossary',
          '/partners',
          '/world-climbing-map',
           /world-rock-climbing/i
      ], (req, res) => res.redirect('/'))


    //-- 301 -> homepage (for SEO)
    .get(['/all-regular-climbers/*',
          '/cffeed*',
          '/climb/*',
          '/climbing-around/*',
          '/climber/*',
          '/climber-profile/*',
          '/climberprofiles/me',
          '/clubs',
          '/indoor-climbing-*',
          '/Feature-Article/*',
          '/join',
          '/media/*',
          '/my-partner-call-subscriptions',
          '/my-climbing-feed',
          '/new-partner-call/*',
          '/outdoor-climbing-*',
          '/partners-rss-feed/*',
          '/places',
          '/places/indoor-rock-climbing-gyms/*',
          '/places/outdoor-rock-climbing/*',
          '/rock-climbing-*',
          '/%0D'
      ], (req, res) => res.redirect(301, '/'))


    //-- 301 Rewrites
    .get('/ico/*', (req, res) => res.redirect(301, req.originalUrl.replace('\/ico','')))
    .get('/apple-touch-*', (req, res) => res.redirect(301, req.originalUrl.replace('touch-','')))
    .get(/^(\/apple-icon-).*(-precomposed\.png)$/, (req, res) => res.redirect(301, req.originalUrl.replace('-precomposed','')))
    .get(/( |(%20))$/, (req, res) => res.redirect(301, req.originalUrl.replace(/( |(%20))*$/,'')))
