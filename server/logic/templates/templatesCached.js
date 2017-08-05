module.exports = ({Template}, {Project, Opts}, DRY) => ({

  exec(cb) {
    var compiled = {}
    var precompiled = {}

    Template.getManyByQuery({}, (e,r) => {
      if (e) return cb(e)
      for (var tmpl of r) {
        compiled[tmpl.key] = {}
        precompiled[tmpl.key] = tmpl
        for (var attr in tmpl.part)
          compiled[tmpl.key][attr] = handlebars.compile(tmpl.part[attr])
      }

      //-- ugly hack
      cache['tmpl_precompile'] = precompiled

      cb(null, compiled)
    })
  }

})

