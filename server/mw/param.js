module.exports = (app, mw) =>

  name =>

    mw.data.recast(name, `params.${name}`, {
      required:   true,
      dest:       `params.${name}`,
      project:    honey.projector[`${name}s`].Project.item,
      queryOpts:  honey.projector[`${name}s`].Opts.item
    })


// { select: '_id userId message meta',
// join: { userId: '_id name photos' } }
