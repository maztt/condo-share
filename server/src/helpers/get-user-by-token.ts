import jwt from 'jsonwebtoken'
import User from '../models/User'
import { Response } from 'express'

const getUserByToken = async (token: string, res: Response): Promise<any> => {
  if (!token) {
    return res.status(401).json({ message: 'Access denied.' })
  }
  const data = jwt.verify(token, 'dasecret')
  return await User.findOne({ data })
}

export { getUserByToken }