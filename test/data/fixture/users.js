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
            "email" : "jkresner@gmail.com.com",
            "picture" : {
                "data" : {
                    "url" : "https://scontent.xx.fbcdn.net/v/t31.0-1/c124.0.480.480/p480x480/1292368_639194289544_253203027_o.jpg?oh=15f31406e3d07facbaacc361482ab1ac&oe=5A383BC6",
                    "is_silhouette" : false
                }
            },
            "tokens" : {
                "cf" : {
                    "token" : "test"
                }
            }
        }
    },
    "meta" : {
        "activity" : [ 
            {
                "action" : "signup",
                "_id" : ObjectId("597e2f52755541797ea3d8b8"),
                "by" : {
                    "_id" : ObjectId("597e2f52755541797ea3d8b7"),
                    "name" : "Jonathon Kresner"
                }
            }, 
        ],
        "lastTouch" : {
            "action" : "signup",
                "_id" : ObjectId("597e2f52755541797ea3d8b8"),
                "by" : {
                    "_id" : ObjectId("597e2f52755541797ea3d8b7"),
                    "name" : "Jonathon Kresner"
                }
        }
    },
    "photos" : [ 
        {
            "value" : "https://scontent.xx.fbcdn.net/v/t31.0-1/c124.0.480.480/p480x480/1292368_639194289544_253203027_o.jpg?oh=15f31406e3d07facbaacc361482ab1ac&oe=5A383BC6",
            "type" : "facebook",
            "primary" : true,
            "_id" : ObjectId("597e2f52755541797ea3d8b9")
        }
    ],
    "emails" : [ 
        {
            "_id" : ObjectId("597e2f52755541797ea3d8b6"),
            "primary" : true,
            "value" : "jkresner@gmail.com",
            "verified" : true,
            "origin" : "oauth:facebook"
        }
    ]
  }

}