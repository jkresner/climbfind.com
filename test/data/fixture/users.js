module.exports = {

  jk: {
    "_id" : ObjectId("597e2f52755541797ea3d8b7"),
    "name" : "Jonathon Kresner",
    "auth" : {
      "fb" : {
        "id" : "859305405104",
        "name" : "Jonathon Kresner",
        "last_name" : "Kresner",
        "first_name" : "Jonathon",
        "gender" : "male",
        "link" : "https://www.facebook.com/app_scoped_user_id/859305405104/",
        "email" : "jkresner@gmail.com",
        "picture" : { "data" : { "url" : "https://scontent.xx.fbcdn.net/v/t31.0-1/c124.0.480.480/p480x480/1292368_639194289544_253203027_o.jpg?oh=15f31406e3d07facbaacc361482ab1ac&oe=5A383BC6",  "is_silhouette" : false } },
        "tokens" : { "cf" : { "token" : "test" } }
      }
    },
    "log" : {
      "last" :
        { "action" : "signup", "_id" : ObjectId("597e2f52755541797ea3d8b8"),
          "by" : { "name" : "Jonathon Kresner", "_id" : ObjectId("597e2f52755541797ea3d8b7") } },
      "history" : [
        { "action" : "signup", "_id" : ObjectId("597e2f52755541797ea3d8b8"),
          "by" : { "_id" : ObjectId("597e2f52755541797ea3d8b7"), "name" : "Jonathon Kresner" } },
      ],
      "comm" : {
        "welcome" : ObjectId("5989fb632ed7bf0004d9dc31")
      }
    },
    "photos" : [
      { "value" : "https://scontent.xx.fbcdn.net/v/t31.0-1/c124.0.480.480/p480x480/1292368_639194289544_253203027_o.jpg?oh=15f31406e3d07facbaacc361482ab1ac&oe=5A383BC6", "type" : "facebook", "primary" : true, "_id" : ObjectId("597e2f52755541797ea3d8b9") }
    ],
    "emails" : [
      { "value" : "jkresner@gmail.com", "_id" : ObjectId("597e2f52755541797ea3d8b6"), "primary" : true, "verified" : true, "origin" : "oauth:facebook" }
    ],
    "settings": {
      "tz" : { "id" : "America/Los_Angeles", "utc_offset" : 420 },
      "notify" : {
        "weekly" : { "day" : 2, "push" : false, "email" : true },
        "messages" : { "push" : false, "email" : true }
      }
    }
  },

  ag: {
    "_id" : ObjectId("5989fb3d8b672e00049baddb"),
    "name" : "Andrew Grosser",
    "auth" : {
      "fb" : {
        "tokens" : { "cf" : { "token" : "EAADSJ" } },
        "picture" : { "data" : { "width" : 480, "height" : 480, "is_silhouette" : false, "url" : "https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/14079567_10207413645634822_6992400653456881864_n.jpg?oh=3fb974a71295e6f760a7f0cf1076ae3c&oe=5A395763" } },
        "email" : "dioptre@gmail.com",
        "link" : "https://www.facebook.com/app_scoped_user_id/10206887308396720/",
        "gender" : "male",
        "first_name" : "Andrew",
        "last_name" : "Grosser",
        "name" : "Andrew Grosser",
        "id" : "10206887308396720"
      }
    },
    "photos" : [
      { "_id" : ObjectId("5989fb3d8b672e00049baddd"), "primary" : true, "type" : "facebook", "value" : "https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/14079567_10207413645634822_6992400653456881864_n.jpg?oh=3fb974a71295e6f760a7f0cf1076ae3c&oe=5A395763" }
    ],
    "emails" : [
      { "value" : "dioptre@gmail.com", "origin" : "oauth:facebook", "verified" : true, "primary" : true, "_id" : ObjectId("5989fb3d8b672e00049badda") }
    ],
    "settings" : {
      "notify" : {
        "weekly" : {
          "day" : 2,
          "push" : false,
          "email" : true
        },
        "messages" : {
          "push" : false,
          "email" : true
        }
      },
      "tz" : { "id" : "America/Los_Angeles", "utc_offset" : 420 }
    },
    "log" : {
        "history" : [
            {
                "action" : "signup",
                "_id" : ObjectId("5989fb3d8b672e00049baddc"),
                "by" : {
                    "_id" : ObjectId("5989fb3d8b672e00049baddb"),
                    "name" : "Andrew Grosser"
                }
            },
            {
                "action" : "sys.welcome",
                "_id" : ObjectId("5989fb642ed7bf0004d9dc32"),
                "by" : {
                    "_id" : ObjectId("514825fa2a26ea0200000017"),
                    "name" : "sys"
                }
            },
            {
                "_id" : ObjectId("5989fffa3795b200047386fd"),
                "action" : "login",
                "by" : {
                    "name" : "Andrew Grosser",
                    "_id" : ObjectId("5989fb3d8b672e00049baddb")
                }
            },
            {
                "action" : "login",
                "_id" : ObjectId("598a001e3795b20004738701"),
                "by" : {
                    "_id" : ObjectId("5989fb3d8b672e00049baddb"),
                    "name" : "Andrew Grosser"
                }
            },
            {
                "_id" : ObjectId("5995e941703ce50004d723d8"),
                "action" : "login",
                "by" : {
                    "name" : "Andrew Grosser",
                    "_id" : ObjectId("5989fb3d8b672e00049baddb")
                }
            }
        ],
        "last" : {
            "by" : {
                "name" : "Andrew Grosser",
                "_id" : ObjectId("5989fb3d8b672e00049baddb")
            },
            "_id" : ObjectId("5995e941703ce50004d723d8"),
            "action" : "login"
        },
        "comm" : {
            "welcome" : ObjectId("5989fb632ed7bf0004d9dc30")
        }
    }
  },

  micht: {
    "_id" : ObjectId("598e777dfe89610004305857"),
    "name" : "Michele T. LaCagnina",
    "auth" : {
      "fb" : {
        "id" : "1124414444",
        "name" : "Michele T. LaCagnina",
        "last_name" : "LaCagnina",
        "first_name" : "Michele",
        "gender" : "female",
        "link" : "https://www.facebook.com/app_scoped_user_id/1624514203/",
        "email" : "michi.lala@test.com",
        "picture" : { "data" : { "width" : 480, "url" : "https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.480.480/p480x480/18528092_10211368921211801_7680849106318404796_n.jpg?oh=fd266aca02d7971baa4309ece68b304a&oe=5A34987F", "is_silhouette" : false, "height" : 480 } },
        "tokens" : { "cf" : { "token" : "ttt" } }
      }
    },
    "log" : {
        "history" : [
            {
                "action" : "signup",
                "_id" : ObjectId("598e777dfe89610004305858"),
                "by" : {
                    "_id" : ObjectId("598e777dfe89610004305857"),
                    "name" : "Michele T. LaCagnina"
                }
            },
            {
                "action" : "sys.welcome",
                "_id" : ObjectId("598e7781241dab00049bd7cb"),
                "by" : {
                    "_id" : ObjectId("514825fa2a26ea0200000017"),
                    "name" : "sys"
                }
            }
        ],
        "last" : { "action" : "sys.welcome", "_id" : ObjectId("598e7781241dab00049bd7cb"),
                "by" : { "_id" : ObjectId("514825fa2a26ea0200000017"), "name" : "sys" } },
        "comm" : { "welcome" : ObjectId("598e7781241dab00049bd7ca") }
    },
    "photos" : [
        {
            "_id" : ObjectId("598e777dfe89610004305859"),
            "primary" : true,
            "type" : "facebook",
            "value" : "https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.480.480/p480x480/18528092_10211368921211801_7680849106318404796_n.jpg?oh=fd266aca02d7971baa4309ece68b304a&oe=5A34987F"
        }
    ],
    "emails" : [ { "origin" : "oauth:facebook", "verified" : true, "value" : "michele.la01@gmail.com", "primary" : true, "_id" : ObjectId("598e777dfe89610004305856") } ],
    "settings" : {
      "notify" : {
        "weekly" : { "day" : 6, "push" : false, "email" : true },
        "messages" : { "push" : false, "email" : true } },
      "tz" : { "utc_offset" : 420, "id" : "America/Los_Angeles" }
    }
  }

}
