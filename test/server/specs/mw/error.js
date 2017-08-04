module.exports = function() {
  
  IT(`404 on /non-existing-page`, function() {
    var spy1 = STUB.spy(Wrappers.ses, 'sendGroup')

    PAGE('/non-existing-page', { status: 404 }, (R0) => {
      expect(/Error/.test(R0)).true
      expect(spy1.called).true
      expect(spy1.calledOnce).true
      expect(spy1.args[0][1].subject).inc('Not Found /non-existing-page')
      DONE()
    })
  })

}
