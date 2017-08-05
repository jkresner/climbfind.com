const Views = {
}

const Query = {
}

const Opts = {
  place: {
    list: { select: `_id name type`, sort: { name: 1 } },
    delete: { select: `_id name deleted` }
  }
}

module.exports = { Views, Query, Opts }
