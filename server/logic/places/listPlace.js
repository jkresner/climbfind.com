module.exports = ({Place}, Data) => ({

  exec(cb) {
    Place.getManyByQuery({}, Data.Opts.list, cb)
  },

  project: Data.Project.list

})

