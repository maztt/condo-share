import jwt from 'jsonwebtoken'
import { getToken } from './get-user-token'
import { NextFunction, Request, Response } from 'express'

interface CustomRequest extends Request {
  user?: any
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {

  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Access denied.' })
  }

  const token = getToken(req)

  if (!token) {
    return res.status(401).json({ message: 'Access denied.' })
  }

  try {
    const verified = jwt.verify(token, 'dasecret')
    req.user = verified
    next()
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' })
  }
}

export { verifyToken }