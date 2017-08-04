module.exports = (app, mw) => {

  var adms = honey.cfg('middleware.forbid.adm').split(',')

  return mw.res.forbid('nonadmin',
      ({user}) => {
        if (adms.indexOf(user._id) == -1)
          return '!admin'
      })

}
