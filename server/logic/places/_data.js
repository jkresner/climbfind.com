const Views = {
}

const Query = {
  cached: { approved: { $exists: 1 } }
}

const Opts = {
  cached: {
    select: `_id name shortName linked type climbing avatar logo geo.tz`,
    sort: { name: 1 }
  },
  list: { select: `_id name` },
  delete: { select: `_id name deleted` }
}

module.exports = { Views, Query, Opts }
