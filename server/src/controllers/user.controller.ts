import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createUserToken } from '../helpers/create-user-token'
import { getToken } from '../helpers/get-user-token'
import { getUserByToken } from '../helpers/get-user-by-token'
import { Request, Response } from 'express'
import { checkForMissingFields } from '../helpers/check-for-missing-fields'

class UserController {
  static async register (req: Request, res: Response) {
    try {
      await checkForMissingFields(req.body, ['name', 'email', 'password', 'confirmpassword', 'phone', 'block', 'apartment'])
      const { name, email, password, confirmpassword, phone, block, apartment } = req.body
      if (password !== confirmpassword) {
        return res.status(400).json({ message: 'The passwords are not matching.' })
      }
      const userExists = await User.findOne({email})
      if (userExists) {
        return res.status(400).json({ message: 'E-mail address is already in use.' })
      }
      const salt = await bcrypt.genSalt(12)
      const hashedPassword = bcrypt.hashSync(password, salt)
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        block,
        apartment
      })
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  static async login (req: Request, res: Response) {
    try {
      await checkForMissingFields(req.body,['email', 'password'])
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'E-mail address is not registered in our database.' })
      }

      const checkPassword = await bcrypt.compare(password, user.password)
      if (!checkPassword) {
        return res.status(400).json({ message: 'Invalid password.' })
      }
      await createUserToken(user, req, res)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  static async checkIfUserIsAuthenticated (req: Request, res: Response) {
    let currentUser;
    if (req.headers.authorization) {
      const token = getToken(req)
      const data = jwt.verify(token, 'dasecret') as JwtPayload
      currentUser = await User.findById(data.id)
      if (currentUser) {
        currentUser.password = ''
      }
    }
    currentUser = null
    res.status(200).send(currentUser)
  }

  static async getUserById (req: Request, res: Response) {
    const id = req.params.id
    const user = await User.findById(id).select('-password')
    if (!user) {
      return res.status(400).json({ message: 'User not found.' })
    }
    res.status(200).json({ user })
  }

  static async editUser (req: Request, res: Response) {
    const token = getToken(req)
    const user = await getUserByToken(token, res)
    if (!user) return

    const { name, email, password, confirmpassword, phone, block, apartment } = req.body

    if (req.file) user.image = req.file.filename
    user.name = name
    user.phone = phone
    user.block = block   
    user.apartment = apartment

    const emailAlreadyExists = await User.findOne({ email })
    if (user.email !== email && emailAlreadyExists) {
      return res.status(400).json({ message: 'This e-mail is already registered to another account.' })
    }
    user.email = email
    
    if (password) {
      if (password === confirmpassword) {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = bcrypt.hashSync(password, salt)
        user.password = hashedPassword
      }
      return res.status(400).json({ message: 'The passwords are not matching.' })
    }

    try {
      await User.findOneAndUpdate(
        {_id: user._id},
        { $set: user },
        { new: true }
      )
      return res.status(200).json({ message: 'User has been updated!'})
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

export default UserController