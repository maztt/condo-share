const mongoose = require('../db/conn')
const { Schema } = mongoose

const Tool = mongoose.model(
  'Tool',
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      images: {
        type: Array,
        required: true
      },
      available: {
        type: Boolean
      },
      owner: Object,
      taker: Object
    },
    { timestamp: true }
  )
)

module.exports = Tool
