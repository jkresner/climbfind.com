logic = null
user = null


module.exports = =>

  
  before (done) ->
    {DAL} = honey.model 
    {DRY} = honey.logic
    Data = honey.projector['posts']
    Logic = require('../../../../../server/logic/posts/createPost')
    logic = Logic(DAL, Data, DRY)
    LOGIN 'jk', (s) -> 
      s._id = ObjectId(s._id)
      user = s      
      DB.removeDocs 'Post', {userId:s._id}, done



  IT "401 User posting same Partner Call more than once", ->    
    d1 = FIXTURE.uniq('post.sixpm.message',{day:1,place:undefined})
    d2 = FIXTURE.uniq('post.sixpm.message',{day:2,place:undefined})    
    DB.docById 'Place', FIXTURE.places.pgsf._id, (pgsf) ->    
      logic.exec.call {user}, d1, pgsf, (e, r) ->
        expect(e).to.be.null
        expect(r._id).bsonId()
        logic.exec.call {user}, d1, pgsf, (e2, r2) ->
          expect(e2).to.exist
          expect(e2.status).to.equal(403)
          expect(e2.message).to.inc('Posted already')
          expect(r2).to.be.undefined
          logic.exec.call {user}, d2, pgsf, (e3, r3) ->
            expect(e3).to.be.null
            expect(r3._id).bsonId()        
            DONE()        

