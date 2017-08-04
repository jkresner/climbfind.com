module.exports = function() {
  
 
  IT(`/`, function() {
    PAGE(TEST.title, { status: 200 }, html => {      
      expect(html).inc(`content="index, nofollow"`)      
      DONE()
    })
  })


  IT(`/login`, function() {
    PAGE(TEST.title, { status: 200 }, html => {      
      expect(html).inc(`content="noindex, nofollow"`)      
      DONE()
    })
  })


}
