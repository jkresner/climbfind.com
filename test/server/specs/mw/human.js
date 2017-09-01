module.exports = function() {


  IT(`[200:empty] / by missing user-agent header`, function() {
    var ua = 'null'
    PAGE(`/`, { ua, status: 200, contentType: /html/ }, html => {
      expect(html).to.equal('')
      DB.docsByQuery('Issue', {}, issues => {
        expect(issues.length).to.equal(0)
        DB.docsByQuery('Events', {}, events => {
          expect(events.length).to.equal(0)
          DONE()
        })
      })
    })
  })


  IT(`[200:empty] / by PhantomJS`, function() {
    var ua = `Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.2 Safari/534.34`
    PAGE(`/`, { ua, status: 200, contentType: /html/ }, html => {
      expect(html).to.equal('')
      DB.docsByQuery('Issue', {}, issues => {
        expect(issues.length).to.equal(0)
        DB.docsByQuery('Events', {}, events => {
          expect(events.length).to.equal(0)
          DONE()
        })
      })
    })
  })


  IT(`[200] / by Firefox`, function() {
    PAGE(`/`, { status: 200, contentType: /html/ }, html => {
      expect(html).inc('Find rock climbing partners')
      DB.docsByQuery('Issue', {}, issues => {
        expect(issues.length).to.equal(0)
        DB.docsByQuery('Events', {}, events => {
          expect(events.length).to.equal(1)
          expect(events[0].name).to.equal('visit')
          DONE()
        })
      })
    })
  })

}
