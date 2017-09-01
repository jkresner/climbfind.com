module.exports = () => {

  before(done => {
    DB.clearCollections("comm user chat", () => done())
  })

  DESCRIBE("Chat", require('./comm/chat'))
  DESCRIBE("Tracking", require('./comm/tracking'))
  DESCRIBE("Local timezone scheduling ", require('./comm/scheduling'))
  DESCRIBE("Mixed transports", require('./comm/transports'))
  DESCRIBE("Fail scenarios", () => {
    it("Retry failed sending scenarios")
  })

}
