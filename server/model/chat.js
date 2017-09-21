module.exports = ({ Id, Enum, Log },
  { asSchema, required, sparse, index }) => {


var userRef = {
  _id:             { type: Id, required, ref: 'User', index },
  name:            { type: String, required },
  avatar:          { type: String, required },
  unread:          { type: Boolean, required, default: true },
  // blocked
}



var message = asSchema({
  userId:          { type: Id, sparse, ref: 'User' },
  postId:          { type: Id, sparse, ref: 'Post' },
  text:            { type: String, required },
  // deleted:      [{_id,userId}]
  commId:          { type: Id, sparse, ref: 'Comm' },
})


return asSchema({
  users:           { type: [userRef], required },
  history:         { type: [message], required },
  log:             { type: Log }
})


}
