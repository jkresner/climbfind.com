module.exports = ({Place}, Data, DRY) => ({

  validate(user, place, cb) {

  },

  exec(place, cb) {
    var meta = DRY.touchMeta(place.meta, 'delete', this.user)
    var deleted = meta.lastTouch
    Place.updateSet(place._id, {meta,deleted}, Data.Opts.delete, cb)
  }

})
