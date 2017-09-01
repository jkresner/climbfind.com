module.exports = {

  jk_ag: {
    "_id" : ObjectId("5989fbe98b672e00049bade8"),
    "users" : [
      { "unread" : true, "name" : "Jonathon Kresner", "_id" : ObjectId("597e2f52755541797ea3d8b7"), "avatar" : "https://scontent.xx.fbcdn.net/v/t31.0-1/c124.0.480.480/p480x480/1292368_639194289544_253203027_o.jpg?oh=15f31406e3d07facbaacc361482ab1ac&oe=5A383BC6" },
      { "unread" : false, "name" : "Andrew Grosser", "_id" : ObjectId("5989fb3d8b672e00049baddb"), "avatar" : "https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/14079567_10207413645634822_6992400653456881864_n.jpg?oh=3fb974a71295e6f760a7f0cf1076ae3c&oe=5A395763" }
    ],
    "history" : [
      { "userId" : ObjectId("5989fb3d8b672e00049baddb"), "_id" : ObjectId("5995e9bd703ce50004d723e0"),
        "text" : "Amazing", },
      { "userId" : ObjectId("597e2f52755541797ea3d8b7"), "_id" : ObjectId("5995de72703ce50004d723cd"),
        "text" : "Mate screw FireChat! Most reliable messaging platform right here!" },
      { "userId" : ObjectId("597e2f52755541797ea3d8b7"), "_id" : ObjectId("598a01cf5a938c0004036dce"),
        "text" : "Ok man, let's finally get our climb on heeeey!",
        "commId" : ObjectId("598a01e594deea0004e5ba4d") },
      { "userId" : ObjectId("5989fb3d8b672e00049baddb"), "_id" : ObjectId("598a01cf5a938c0004036dcd"),
        "text" : "##### Partner Call for **18 Jan @ Mission Cliffs**\n\nLooking for someone to climb tomorrow! :)",
        "postId" : ObjectId("5989fb818b672e00049bade0") },
      { "userId" : ObjectId("5989fb3d8b672e00049baddb"), "_id" : ObjectId("5989fbe98b672e00049badea"),
        "text" : "Hey let's climb?!",
        "commId" : ObjectId("5989fbf92ed7bf0004d9dc40") }
    ],
    "log" : {
      "last" :
        { "action" : "message", "_id" : ObjectId("5995e9bd703ce50004d723df"),
          "by" : { "name" : "Andrew Grosser", "_id" : "5989fb3d8b672e00049baddb" } },
      "history" : [
        { "action" : "message", "_id" : ObjectId("5989fbe98b672e00049bade5"),
          "by" : { "name" : "Andrew Grosser", "_id" : "5989fb3d8b672e00049baddb" } },
        { "action" : "notify:1", "_id" : ObjectId("5989fbfa2ed7bf0004d9dc41"),
          "by" : { "name" : "sys",  "_id" : ObjectId("514825fa2a26ea0200000017") } },
        { "action" : "message", "_id" : ObjectId("5989fde58b672e00049badef"),
          "by" : { "name" : "Jonathon Kresner", "_id" : "597e2f52755541797ea3d8b7" } },
        { "action" : "notify:1", "_id" : ObjectId("5989fdee2ed7bf0004d9dc6c"),
          "by" : { "name" : "sys", "_id" : ObjectId("514825fa2a26ea0200000017") } },
        { "action" : "message", "_id" : ObjectId("598a01cf5a938c0004036dca"),
          "by" : { "name" : "Jonathon Kresner", "_id" : "597e2f52755541797ea3d8b7" } },
        { "action" : "notify:1", "_id" : ObjectId("598a01e694deea0004e5ba4e"),
          "by" : { "name" : "sys", "_id" : ObjectId("514825fa2a26ea0200000017") } },
        { "action" : "message", "_id" : ObjectId("5995de72703ce50004d723cc"),
          "by" : { "name" : "Jonathon Kresner", "_id" : "597e2f52755541797ea3d8b7" } },
        { "action" : "read", "_id" : ObjectId("5995e9b6703ce50004d723de"),
          "by" : { "name" : "Andrew Grosser", "_id" : "5989fb3d8b672e00049baddb" } },
        { "action" : "message", "_id" : ObjectId("5995e9bd703ce50004d723df"),
          "by" : { "name" : "Andrew Grosser", "_id" : "5989fb3d8b672e00049baddb" } }
      ]
    }
  }
}
