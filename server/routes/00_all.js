module.exports = (app, mw) => {

  app

    .use(mw.$.human)

    .head('*',
      (req,res,ext) => res.status(403).send(''))

    .all([
      '*.php',
      '*wp-*',
      '*.txt',
      ],
      (req, res, next) => res.status(200).send(''))

}
