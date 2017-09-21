module.exports =

  sixpm:
    type:     'indoor'
    climbing: ['tr']
    day:      0
    message:  "Just found out I don't have work today so if anyone wants to top rope before 6pm. Happy to climbfind with any level."

  anylevel:
    type:     'indoor'
    climbing: ['tr']
    day:      1
    message:  "I'd like to trade top rope belays between 6:30pm and 8:30pm. I'm just starting to climb 5.10s not so successfully, but you can be any level so long as you are ok with me falling often."

  squamish:
    type:     'outdoor'
    climbing: ['lead']
    day:      4
    message:  "Going to be in Squamish on the weekend. WOuld love to meet up for a day or two. Probably won't lead beyond 5.9. Thinking about doing Detroide too for the first time. If you are in the area during that time, let me know."

  teamup:
    type:     'indoor'
    climbing: ['lead','tr']
    day:      3
    message:  "I'm looking to team up with a competent, confident, trad climber to lots of routes outdoors from May. Also happy to climb in other states."

  wkend:
    type:     'indoor'
    climbing: ['tr','boulder']
    day:      2
    message:  "TR partner this weekend, Fri-Sun? My current partner is on marriage leave. Text 240.393.7276 or send me a message thanks!"

  comp:
    type:     'indoor'
    climbing: ['boulder']
    day:      5
    message:  "Bouldering comp this week, would love to team up with someone to work through all the problems and share beta!"

  comeback:
    type:     'indoor'
    climbing: ['tr']
    day:      6
    message:  "Haven't climbed for 5 years, but excited to get back into it! Perhaps start slow with some Top Rope. Down to climb with all."

  jk_hello:
    _id:      ObjectId("59841c9f4e4287a2b83bea2a")
    type:     "indoor"
    placeId:  ObjectId("597e2073dba1187878dcbaf0")
    message:  "Thanks for using Climbfind! \n\nThis is the 3rd partner finding app I've made from scratch since launching climbfind.com in 2008. It is by far the smallest and I believe most streamlined and efficient user experience yet. I hope you enjoy it and meeting many awesome fellow Climbfind climbers.\n\nFeel free to message/reply here if you have feedback, spot issues or want to say hi :-)\n\n#belayon #findandshareyourpassion\n\njk\nClimbfind Founder"
    userId:   ObjectId("597e2f52755541797ea3d8b7")
    log:
      comm: {  "notify" : ObjectId("598963c0b6cfcb0004a29c8b") }
      history: [
          { "action" : "create", "_id" : ObjectId("59841c9f4e4287a2b83bea29"), "by" : { "_id" : "597e2f52755541797ea3d8b7", "name" : "Jonathon Kresner" } }
          { "action" : "notify:1", "_id" : ObjectId("598963c0b6cfcb0004a29c8c"), "by" : { "name" : "sys", "_id" : ObjectId("514825fa2a26ea0200000017") } }
        ],
      last: { "action" : "notify:1", "_id" : ObjectId("598963c0b6cfcb0004a29c8c"), "by" : { "name" : "sys", "_id" : ObjectId("514825fa2a26ea0200000017") } }
    time: ISODate("2017-08-05T07:00:00.000Z"),
    tz: { "id" : "America/Los_Angeles", "utc_offset" : 420 }
    climbing: [  "tr",  "lead",  "boulder" ]
