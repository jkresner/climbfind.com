module.exports = ->


  IT "Areas/cities and climbing places", ->
    @timeout 10000
    areas = FIXTURE.places.import.areas
    OI "Importing areas", areas
    importArea = honey.logic.mod.areaImport.chain
    set = areas.map (p) ->
      (cb) ->
        importArea.call {user:sys}, p, (e, r) ->
          expect(e, JSON.stringify(r||e.message)).to.be.null
          cb(e, r)
    WHEN set, (r) -> DONE()


  IT "Add place linked to existing area", ->
    toId = honey.logic.DRY.id.parse
    {linked} = FIXTURE.places.import
    OI "Adding linked ", linked
    add = honey.logic.mod.placeAdd.chain
    {Place} = honey.model.DAL
    set = linked.map (p) ->
      (cb) ->
        p.linked = p.linked.map((id)=>toId(id))
        add.call {user:sys}, p, (e, r) ->
          $log("add  #{r.linked}\t#{r._id}  #{r.name}".green)
          expect(e, JSON.stringify(r||e.message)).to.be.null
          cb(e, r)
    WHEN set, (r) -> DONE()

