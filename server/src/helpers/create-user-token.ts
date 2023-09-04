import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const createUserToken = async (user: any, req: Request, res: Response) => {

  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, "dasecret")

  res.status(200).json({
    message: "You've been authenticated!",
    token: token,
    userId: user._id
  })

}

export { createUserToken }
