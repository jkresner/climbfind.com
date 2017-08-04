module.exports = ->

  IT "signup > post partner call", -> require('./flow/01')
  IT.skip "admin > add place > edit place", -> require('./flow/02')
