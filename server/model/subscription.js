module.exports = ({ Id, Enum, Meta },
  { asSchema, required }) =>

asSchema({

  userId:         { type: Id, ref: 'User', required },
  placeId:        { type: Id, ref: 'Place', required },
  indoor:         { type: Boolean, required, default: true },      // get indoor partner calls
  outdoor:        { type: Boolean, required, default: true },      // get outood partner calls
  // official:       { type: Boolean, required, default: true },      // get communications from gym
  email:          { type: Boolean, required, default: true },
  push:           { type: Boolean, required, default: false },
  beat:           { type: String, enum: Enum.SUBSCRIPTION.BEAT, required, default: 'instant' },

  // fb_group: {
  //   id:           { type: String },
  //   token:        { type: String }
  // },

  log:            { type: Meta }

})


