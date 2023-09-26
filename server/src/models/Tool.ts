import db from '../db/conn'
import { Schema } from 'mongoose'

const Tool = db.model(
  'Tool',
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      category: {
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
      owner: {
        type: Object,
        ref: 'User'
      },
      claimer: {
        type: Object,
        ref: 'User'
      }
    },
    { timestamps: true }
  )
)

export default Tool
