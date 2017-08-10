module.exports = (app, mw) =>

  mw.req.noCrawl({
    group: 'ban',
    content:'',
    onDisallow: req => null
  })



