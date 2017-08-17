module.exports = () => {

  before(done => {
    DB.clearCollections("comm", () => done())
  })

  DESCRIBE("Local timezone scheduling ", require('./comm/scheduling'))
  DESCRIBE("Mixed transports", require('./comm/transports'))
  DESCRIBE("Fail scenarios", () => {
    it("Retry failed sending scenarios")
  })

}
