module.exports = =>

  IT "[403] Posting same details more than once", ->
    {dogb} = FIXTURE.places
    p1 = FIXTURE.uniq('post.sixpm.message',{day:1,place:undefined,climbing:['boulder']})
    p2 = FIXTURE.uniq('post.sixpm.message',{day:2,place:undefined,climbing:['boulder']})
    LOGIN 'bk', (s) =>
      q = userId: ObjectId(s._id)
      DB.removeDocs 'Post', q, ->
        POST "/posts/#{dogb._id}", p1, (r1) ->
          expect(r1._id).bsonIdStr()
          expect(r1.place._id).eqId(dogb)
          POST "/posts/#{dogb._id}", p1, { status: 403 }, (e1) ->
            expect(e1.message).to.inc('Posted already')
            POST "/posts/#{dogb._id}", p2, (r2) ->
              expect(r2._id).bsonIdStr()
              expect(r2.place._id).eqId(dogb)
              DONE()
