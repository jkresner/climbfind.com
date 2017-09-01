var data = {
  user_welcome: {
    "url" : {
      "post" : {
        "ses" : "https://www.climbfind.com/ses/post/31c6ppmdjb",
        "to" : "/partner-call"
      },
      "img": { "logo_ses": "/ses/logo.jpg" }
    },
    "user" : {
      "name" : "Andrew Grosser",
      "_id" : "5989fb3d8b672e00049baddb"
    },
    "to": { first: "Andrew" }
  },
  chat_message: {
    "url" : {
      "settings" : {
        "ses" : "https://www.climbfind.com/ses/settings/3d142t4t2z",
        "to" : "/account"
      },
      "chat" : {
        "ses" : "https://www.climbfind.com/ses/chat/3d142t4t2z",
        "to" : "/messages/598a04d35a938c0004036de1"
      }
    },
    "message" : {
      "user" : {
        "avatar" : "https://scontent.xx.fbcdn.net/v/t31.0-1/c124.0.480.480/p480x480/1292368_639194289544_253203027_o.jpg?oh=15f31406e3d07facbaacc361482ab1ac&oe=5A383BC6",
        "name" : "Jonathon Kresner"
      },
      "text" : "Hey man great I love early morning hard rock dates.",
    },
    "chat" : { "_id" : "598a04d35a938c0004036de1" },
    "to": { first: "Andy" }
  },
  post_notify: {
    "url" : {
      "settings" : {
        "ses" : "https://www.climbfind.com/ses/settings/31c6prynm6",
        "to" : "/account"
      },
      "reply" : {
        "ses" : "https://www.climbfind.com/ses/reply/31c6prynm6",
        "to" : "/reply/5989fb818b672e00049bade0"
      },
      "img": { "logo_ses": "/ses/logo.jpg" }
    },
    "post" : {
      "place" : {
        "shortName" : "Mission Cliff",
        "name" : "Mission Cliffs"
      },
      "user" : {
        "avatar" : "https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/14079567_10207413645634822_6992400653456881864_n.jpg?oh=3fb974a71295e6f760a7f0cf1076ae3c&oe=5A395763",
        "name" : "Andrew Grosser"
      },
      "day" : "09 Aug",
      "climbing" : "Top Rope or Lead Climb",
      "_id" : "5989fb818b672e00049bade0"
    },
    "to": { first: "Andy" }
  }
}




module.exports = (DAL, Data, DRY) => ({


  exec(cb) {
    var r = []

    for (var key in cache['tmpl_precompile']) {
      var tdata = data[key.split(':')[0]]
      var t = assign({key},cache['tmpl_precompile'][key])
      t.rendered = honey.templates.get(key).render(tdata)
      r.push(t)
    }

    cb(null, r)

  }


})
