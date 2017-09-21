  module.exports = ({ Id, Enum, Log },
  { asSchema, required, lowercase, sparse, unique, index }) =>


asSchema({

  _sid:           { type: String, unique, index, sparse },
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
    //      _id      [{ type: Id, required }],
    //      key      [{ type: String, required }],
    //      msgId:   [{ type: String, required }],
    //      ct:      []
    //   }]
  retry:          {}
  // [{
    // to:           [{type: Id, ref: 'Subscription'}],
    // key:          { type: String },
    // e:            { type: String }
  // }]


})
