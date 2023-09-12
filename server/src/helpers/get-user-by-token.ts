import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/User'
import { Response } from 'express'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const getUserByToken = async (token: string, res: Response): Promise<any> => {
  if (!token) {
    return res.status(401).json({ message: 'Access denied.' })
  }
  const { id } = jwt.verify(token, 'dasecret') as JwtPayload
  if (!ObjectId.isValid(id)) {
    return false
  }
  return await User.findById(id)
}

export { getUserByToken }