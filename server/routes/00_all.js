module.exports = (app, mw) => {

  app

    .use(mw.$.botBan)

    .all([
      '*.php',
      '*wp-*',
      ],
      (req, res, next) => res.status(200).send(''))

}
