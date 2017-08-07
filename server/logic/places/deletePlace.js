module.exports = ({Place}, Data, DRY) => ({


  validate(user, place, cb) {
    if (place.deleted) `Place[${place._id}] already deleted`
  },


  exec(place, cb) {
    var log = DRY.logAct(place, 'delete', this.user)
    var deleted = log.last
    Place.updateSet(place._id, {log,deleted}, Data.Opts.delete, cb)
  }


})
