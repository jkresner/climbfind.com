const Views = {
}

const Query = {
}

const Opts = {
}

const Projections = ({select},{chain}) => ({

  user_welcome: ({user}) => ({
    post: {
      ses: `${config.http.host}/partner-call?comm=auth_signup:ses`
    }
  }),


  chat_message: ({chat,message}) => ({
    chat: {
      ses: `${config.http.host}/messages/${chat._id}?message=${message._id}&comm=chats_message:ses`
    }
  }),

  post_notify: ({post}) => ({
    reply: {
      ses: `${config.http.host}/reply/${post._id}?comm=posts_notify:ses`
    }
  })

})

module.exports = { Views, Query, Opts, Projections }
