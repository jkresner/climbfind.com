module.exports = {

  signup_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000001"),
    "type" : "mail",
    "key" : "user_welcome:ses",
    "description" : "Welcome new user",
    "part": {
      "from": "Climbfind <contact@climbfind.com>",
      "subject": "Welcome to Climbfind",
      "text": "- - -\n\n**Congrats on your Climbfind account!** \n\nLife changing climbing connections and experiences are right round the corner. Thousands of climbers like yourself have met and partnered up through Climbfind since 2008. We even know of a few who got married!\n\n##### Let's get things started:\n\n### [Post a Partner Call]({{url.post.ses}})\nPost to places where you want to meet folks so Climbfind can learn your preferences and starts personalizing your feed and recommendations. \n\nBelay on! \n\nJ.K.  \nClimbfind Founder"
    }
  },

  chats_message_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000002"),
    "type" : "mail",
    "key" : "chat_message:ses",
    "description" : "Notify user of new message",
    "part" : {
      "from": "Climbfind <contact@climbfind.com>",
      "subject" : "Message from {{message.user.name}}",
      "text" : "{{to.first}}, \n\n### [New message]({{url.chat.ses}}) from {{message.user.name}}\n\nBelay on! \n\nTeam Climbfind\n\n- - - \nP.S. Customize notifications from [settings]({{url.settings.ses}})"
    }
  },

  post_notify_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000003"),
    "type" : "mail",
    "key" : "post_notify:ses",
    "description" : "Notify user of a new partner post",
    "part": {
      "from": "Climbfind <contact@climbfind.com>",
      "subject": "{{post.place.shortName}} partner {{post.day}}",
      "text": "Hi {{to.first}}, \n\n{{post.user.name}} just posted [a partner call]({{url.reply.ses}} for {{post.climbing}} on {{post.day}} @ {{post.place.name}}\n - - - \nP.S. Customize notifications from [settings]({{url.settings.ses}})"
    }
  },

  post_weekly_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000004"),
    "type" : "mail",
    "key" : "post_weekly:ses",
    "description" : "Summary of new partner post matching users subscriptions",
    "part": {
      "from": "Climbfind <contact@climbfind.com>",      
      "subject": "Partner calls this week",
      "text": "Hi {{to.first}}, \n\n{{posts.length}} posts matching your notification settings.\n\n{{#each posts}}\n[{{user.first}} @ {{place.shortName}}]({{post.url.reply_weekly_mail}})\n{{/each}}\n\n- - - \nSettings\n\nplace|notify|indoor|outdoor\n----------------|----------|{{#each subscriptions}}\n{{place.shortName}}|{{beat}}|{{indoor}}|{{outdoor}}|{{/each}}\n\[update your notification settings]({{http.host}}/account)"
    }
  },

  user_onetime_login: {
    "_id" : ObjectId("5984a08da3bb5ac600000005"),
    "type" : "mail",
    "key" : "user_onetime_login:ses",
    "description" : "Magic link to email address",
    "part" : {
        "subject" : "Login to Climbfind",
        "text" : "Hi {{to.first}}, n\n- - -\n\nHere's your [magic login link]({{url_magic}})"
    }
  },

}
