module.exports = ({ Id, Enum, Location, Meta, Touch },
  { asSchema, required, sparse, unique }) => {


var googleRaw = {
  address_components:   { type: [], required },
  formatted_address:    { type: String, required },
  geometry: {
    location: {
      lat:              { type: Number, required },
      lng:              { type: Number, required }
    },
    viewport:           { type: {} },
  },
  id:                   { type: String, required },
  name:                 { type: String, required },
  place_id:             { type: String, required, unique },
  types:                { type: [String], required },
  utc_offset:           { type: Number, required },
  vicinity:             { type: String }
}


return asSchema({

  name:            { type: String, required },
  shortName:       { type: String, required },

  type:            { type: String, enum: Enum.PLACE.TYPE },
  climbing:        { type: [{ type: String, enum: Enum.CLIMBING }], required },

  // description:    { type: String },
  // slug:           { type: String },
  avatar:          { type: String },
  logo:            { type: String },

  linked:          [{type: Id, ref: 'Place' }],

  // ownerId:         { type: Id, sparse, ref: 'User' },
  tokens:          { type: String },  // used to assist search

  geo: {
    address:       { type: String },
    tz:            { type: String, required },
    lat:           { type: Number, required },
    lng:           { type: Number, required }
  },

  raw:             googleRaw,

  log:             { type: Meta },
  approved:        { type: Touch },
  deleted:         { type: Touch },

})

}
