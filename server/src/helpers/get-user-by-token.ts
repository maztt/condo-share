import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/User'
import { Response } from 'express'

const getUserByToken = async (token: string, res: Response): Promise<any> => {
  if (!token) {
    return res.status(401).json({ message: 'Access denied.' })
  }

  const { _id } = jwt.verify(token, 'dasecret') as JwtPayload
  const userId = _id

  const user = await User.findOne({ _id: userId })

  return user
}

export { getUserByToken }