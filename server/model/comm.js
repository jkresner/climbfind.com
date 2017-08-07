  module.exports = ({ Id, Enum, Location, Meta, Touch },
  { asSchema, required, lowercase, sparse }) =>


asSchema({

  type:           { type: String, enum: Enum.COMM.TYPE },

  templates:      {},
  // [{
  //   key:          { type: String, required },
  //   type:         { type: String, required },
  //   part:         { type: Object, required }
  // }],
  data:           {},

  tz: {
    // id:           { type: String, required },
    // utc_offset:   { type: Number, required }
  },
  scheduled:      { type: Date },
  sent:           {},
    // to:           [{type: Id, ref: 'Subscription'  }],
    // {
    //   [{
    //      key    [{ type: String, required }],
    //      msgId: [{ type: String, required }],
    //      opens:  []
    //   }]
  retry:          {}
  // [{
    // to:           [{type: Id, ref: 'Subscription'}],
    // key:          { type: String },
    // e:            { type: String }
  // }]


})
