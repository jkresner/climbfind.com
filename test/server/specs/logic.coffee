module.exports = ->

  DESCRIBE "auth", =>
    DESCRIBE "facebook", require('./logic/auth/oauth')

  DESCRIBE "posts", =>
    DESCRIBE "createPost", require('./logic/posts/createPost')