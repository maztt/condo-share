const User = require('../models/User')

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword, phone, block, apartment } =
      req.body

    if (!name) {
      res.status(422).json({
        message: 'You must specify a name!'
      })
      return
    }

    if (!email) {
      res.status(422).json({
        message: 'You must specify an email!'
      })
      return
    }

    if (!password) {
      res.status(422).json({
        message: 'Pick a password for your account!'
      })
      return
    }

    if (!confirmpassword) {
      res.status(422).json({
        message: 'You must confirm your password!'
      })
      return
    }

    if (password !== confirmpassword) {
      res.status(422).json({
        message: 'The passwords are not matching.'
      })
      return
    }

    if (!phone) {
      res.status(422).json({
        message: 'You must inform your phone!'
      })
      return
    }

    if (!block) {
      res.status(422).json({
        message: 'You must inform the block you live!'
      })
      return
    }

    if (!apartment) {
      res.status(422).json({
        message: 'You must inform the apartment you live!'
      })
      return
    }

    
    const userExists = await User.findOne({
      email: email
    })

    if (userExists) {
      res.status(422).json({
        message: 'This user is already registered to our database. Try other email.'
      })
    }
  }
}
