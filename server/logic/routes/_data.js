const Views = {
}

const Query = {
}

const Opts = {
}

const Projections = ({select},{chain}) => ({

  user_welcome: ({_sid, user}) => ({
    post: {
      to: `/partner-call`,
      ses: `${config.http.host}/ses/post/${_sid}`
    }
  }),

  chat_message: ({_sid,chat,message}) => ({
    chat: {
      to: `/messages/${chat._id}`,
      ses: `${config.http.host}/ses/chat/${_sid}`
    },
    settings: {
      to: `/account`,
      ses: `${config.http.host}/ses/settings/${_sid}`
    }
  }),

  post_notify: ({_sid, post}) => ({
    reply: {
      to: `/reply/${post._id}`,
      ses: `${config.http.host}/ses/reply/${_sid}`
    },
    settings: {
      to: `/account`,
      ses: `${config.http.host}/ses/settings/${_sid}`
    }
  })

})

module.exports = { Views, Query, Opts, Projections }
