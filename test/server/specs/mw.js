module.exports = () => {

  before(done => {
    DB.clearCollections("posts issues events", () => done())
  })

  DESCRIBE("error", require('./mw/error'))
  DESCRIBE("nobot", require('./mw/nobot'))
  DESCRIBE("noindex", require('./mw/noindex'))

}
