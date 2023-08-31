import db from '../db/conn.js'
import { Schema } from 'mongoose'

const User = db.model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      block: {
        type: String,
        required: true
      },
      apartment: {
        type: String,
        required: true
      },
      image: {
        type: String
      }
    },
    { timestamps: true }
  )
)

export default User
