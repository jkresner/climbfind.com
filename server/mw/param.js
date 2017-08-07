module.exports = (app, mw) =>

  name =>

    mw.data.recast(name, `params.${name}`, {
      required:   true,
      dest:       `params.${name}`,
      project:    honey.projector[`${name}s`].Project.param,
      queryOpts:  honey.projector[`${name}s`].Opts.item
    })
