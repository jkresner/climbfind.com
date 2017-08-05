 module.exports = ->


  # before (done) ->
  DESCRIBE "Posts_Notify", ->

    it "Real-time post notify emails between 8am-1am"
      # 1 on post create comm[post:instant]
      # 2 read comm for scheduled && !sent
      # 3 query instant subscription for placeId

  
  # DESCRIBE "SENDING", ->

  it "Send 8:45am local time daily notify digest"  
    # 1 on post create comm[post:daily]
    # query realtime subscription for placeId


  it "Send weekly notify digest"  
    # 1 on post create comm[post:weekly]
    # need to know users most recent timeZoneId




  # 1. create queue/scheduled like data
  #   - Synchronously Write to Comm
  #   - App has logic to process Comm.doc
  #   + Data can all exist in Comm
  #   + Scheduled sending simpler 
  #     1. Create work item with doc.scheduled
  #     2. Poll Comm for docs => now.after(scheduled) && !sent


  # 2. async check missing FKs on objs
  #   - If nothing sent still need empty comm docs     