module.exports = ({ Id, Enum, Location, Log, Act },
  { asSchema, required, lowercase, sparse }) =>

asSchema({

  type:           { type: String, enum: Enum.POST.TYPE },
  climbing:       { type: [String], required, lowercase }, // enum: Enum.CLIMBING,
  time:           { type: Date, required },
  userId:         { type: Id, ref: 'User', required },
  placeId:        { type: Id, ref: 'Place', required },
  message:        { type: String, required },

  log:            { type: Log },
  deleted:        { type: Act },

  // comm: {
    // notify:       { type: Id, ref: 'Comm', sparse },
    // weekly:       { type: [{type:Id, ref: 'Comm'}], required: false }
  // },

  tz: {
    id:           { type: String, required },
    utc_offset:   { type: Number, required }
  }

})
