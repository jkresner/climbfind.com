module.exports = {

  signup_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000001"),
    "type" : "mail",
    "key" : "signup:ses",
    "description" : "Welcome new user",
    "part": {
      "from": "Climbfind <contact@climbfind.com>",
      "subject": "Find and share your passion",
      "text": "Hi {{to.first}}, \n\nWelcome to Climbfind. Look forward to you making enjoying lots of new climbing connections and experiences.\n\nJK \nClimbfind Founder"
    }
  },

  chats_message_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000002"),
    "type" : "mail",
    "key" : "chats_message:ses",
    "description" : "Notify user of new message",
    "part" : {
      "from": "Climbfind <contact@climbfind.com>",
      "subject" : "Message from {{message.user.name}}",
      "text" : "Hi {{to.first}}, \n\nYou've got a new [message from {{message.user.name}}]({{url.chat.ses}})"
    }
  },

  post_notify_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000003"),
    "type" : "mail",
    "key" : "posts_notify:ses",
    "description" : "Notify user of a new partner post",
    "part": {
      "from": "Climbfind <contact@climbfind.com>",
      "subject": "{{post.place.shortName}} partner for {{post.day}}",
      "text": "Hi {{to.first}}, \n\n{{post.user.name}} just posted [a partner call]({{post.url.reply_notify_mail}})"
    }
  },

  post_weekly_mail: {
    "_id": ObjectId("5984a08da3bb5ac600000004"),
    "type" : "mail",
    "key" : "posts_weekly:ses",
    "description" : "Summary of new partner post matching users subscriptions",
    "part": {
      "from": "Climbfind <contact@climbfind.com>",      
      "subject": "Partner calls this week",
      "text": "Hi {{to.first}}, \n\n{{posts.length}} posts matching your notification settings.\n\n{{#each posts}}\n[{{user.first}} @ {{place.shortName}}]({{post.url.reply_weekly_mail}})\n{{/each}}\n\n- - - \nSettings\n\nplace|notify|indoor|outdoor\n----------------|----------|{{#each subscriptions}}\n{{place.shortName}}|{{beat}}|{{indoor}}|{{outdoor}}|{{/each}}\n\[update your notification settings]({{http.host}}/account)"
    }
  },

}