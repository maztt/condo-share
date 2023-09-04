import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUserToken } from '../helpers/create-user-token'
import { getToken } from '../helpers/get-user-token'
import { getUserByToken } from '../helpers/get-user-by-token'
import { Request, Response } from 'express'

class UserController {
  static async register (req: Request, res: Response) {
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

    // To check if user is available
    const userExists = await User.findOne({
      email: email
    })

    if (userExists) {
      res.status(422).json({
        message:
          'This user is already registered to our database. Try other email.'
      })
      return
    }

    // To encrypt the password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    // To create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      block,
      apartment
    })

    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }

  static async login (req: Request, res: Response) {
    const { email, password } = req.body

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

    const user = await User.findOne({
      email: email
    })

    if (!user) {
      res.status(422).json({
        message: 'The account does not exist. Check your email.'
      })
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(422).json({
        message: 'Invalid password.'
      })
      return
    }

    await createUserToken(user, req, res)
  }

  static async check (req: Request, res: Response) {
    interface JwtPayload {
      _id: string
    }

    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req)
      const { _id } = jwt.verify(token, 'dasecret') as JwtPayload

      currentUser = await User.findById(_id)
      if (currentUser) {
        currentUser.password = ''
      }
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById (req: Request, res: Response) {
    const id = req.params.id
    const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(422).json({
        message: 'User not found.'
      })

      return
    }

    res.status(200).json({ user })
  }

  static async editUser (req: Request, res: Response) {

    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (!user) return

    const { name, email, password, confirmpassword, phone, block, apartment } =
      req.body

    if (req.file) {
      user.image = req.file.filename
    }
    
    if (!name) {
      res.status(422).json({
        message: 'You must specify a name!'
      })
      return
    }

    user.name = name

    if (!email) {
      res.status(422).json({
        message: 'You must specify an email!'
      })
      return
    }

    const userExists = await User.findOne({ email: email })

    if (user.email !== email && userExists) {
      res.status(422).json({
        message: 'Please, try other email.'
      })
      return 
    }

    user.email = email

    
    if (!phone) {
      res.status(422).json({
        message: 'You must inform your phone!'
      })
      return
    }
    
    user.phone = phone
    
    if (!block) {
      res.status(422).json({
        message: 'You must inform the block you live!'
      })
      return
    }
    
    user.block = block
    
    if (!apartment) {
      res.status(422).json({
        message: 'You must inform the apartment you live!'
      })
      return
    }
    
    user.apartment = apartment
    
    if (password !== confirmpassword) {
      res.status(422).json({
        message: 'The passwords are not matching.'
      })
      return
    } else if (password === confirmpassword && password != null) {
      const salt = await bcrypt.genSalt(12)
      const hashedPassword = await bcrypt.hashSync(password, salt)
  
      user.password = hashedPassword
    }

    try {
      await User.findOneAndUpdate(
        {_id: user._id},
        { $set: user },
        { new: true }
      )

      res.status(200).json({ message: 'User has been updated!'})
    } catch (error) {
      res.status(500).json({ message: error })
      return
    }
  }
}

export default UserController