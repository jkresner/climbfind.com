module.exports = ({ Id, Enum, Location, Meta, Touch },
  { asSchema, required, lowercase, sparse }) =>

asSchema({

  type:           { type: String, enum: Enum.POST.TYPE },
  climbing:       { type: [String], required, lowercase }, // enum: Enum.CLIMBING,
  time:           { type: Date, required },
  userId:         { type: Id, ref: 'User', required },
  placeId:        { type: Id, ref: 'Place', required },
  message:        { type: String, required },

  meta:           { type: Meta },
  deleted:        { type: Touch },

  tz: {
    id:           { type: String, required },
    utc_offset:   { type: Number, required }
  },

})
