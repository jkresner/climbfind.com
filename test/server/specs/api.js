module.exports = () => {

  before(done => {
    DB.resetCollections(done)
  })

  DESCRIBE("Basic usage", require('./api/basics'))
  DESCRIBE("Posts", require('./api/posts'))

}
