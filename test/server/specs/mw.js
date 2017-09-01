module.exports = () => {

  before(done => {
    DB.clearCollections("issues events", () => done())
  })

  DESCRIBE("human", require('./mw/human'))
  DESCRIBE("error", require('./mw/error'))
  DESCRIBE("noindex", require('./mw/noindex'))

}
