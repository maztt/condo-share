import jwt from 'jsonwebtoken'

const createUserToken = async (user, req, res) => {

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
