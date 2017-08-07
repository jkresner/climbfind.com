module.exports = ({Place}, Data, DRY) => ({

  validate(user, existing, p) {
    if (!p.name) return 'Name required'
    if (!p.shortName) return 'Short required'
    if (!p.logo && !existing.logo) return 'Logo required'
    if (!p.avatar && !existing.avatar) return 'Avatar required'
  },

  exec(place, update, cb) {
    update.log = DRY.logAct(place, 'update', this.user)
    Place.updateSet(place._id, update, cb)
  }

})
