module.exports = (app, mw) => {

  honey

    .Router('ignore', {type: 'html'})

    .head('*',
      (req, res) => res.status(403).send(''))

    .all(/(\.php|\.txt|wp-)/i,
      (req, res) => res.status(200).send(''))

    .all(/^\/(_|ad|cms|system|login\/)/i,
      (req, res) => res.status(200).send(''))

}
