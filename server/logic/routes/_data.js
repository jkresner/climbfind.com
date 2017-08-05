const Views = {
}

const Query = {
}

const Opts = {
}

const Projections = ({},{chain}) => ({

  chats_message: c => ({
    chat: {
      ses: `${config.http.host}/messages/${c._id}?message=${c.history[0]._id}&comm=chats_message:ses`
    }
  }),

  posts_notify: p => ({
    reply: {
      ses: `${config.http.host}/reply/${p._id}?comm=posts_notify:ses`
    }
  })

})

module.exports = { Views, Query, Opts, Projections }
