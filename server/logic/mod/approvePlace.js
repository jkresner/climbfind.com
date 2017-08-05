module.exports = ({Place}, Data, DRY) => ({


  validate(user, p, place) {
    if (!p.type) return 'Type required'
    if (!p.name) return 'Name required'
    if (!p.shortName) return 'Short name required'
    if (!p.logo) return 'Logo url required'
    if (/^https/.test(p.logo)) return 'https:// Logo required'
    if (!p.avatar) return 'Avatar url required'
    if (/^https/.test(p.avatar)) return 'https:// Avatar required'
    if (!p.climbing) return 'Climbing types [bouldering, top rope, lead] required'
    for (var t of p.climbing)
      if (honey.model.Enum.CLIMBING.indexOf(t) == -1)
        return `Climbing type ${t} invalid`
  },


  exec(data, place, cb) {
    // data.meta = DRY.touchMeta(null, 'create', this.user)
    // Place.create(data, cb)
  }


})
