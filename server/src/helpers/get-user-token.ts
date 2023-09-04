import { Request } from "express"

const getToken = (req: Request): string => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
  
    return token
  }
  return ''
}

export { getToken }