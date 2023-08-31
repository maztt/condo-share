import express from 'express'
import UserController from '../controllers/UserController.js'
import { verifyToken } from '../helpers/verify-user-token.js'
import { imageUpload } from '../helpers/image-upload.js'

const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/check', UserController.check)
router.get('/:id', UserController.getUserById)
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  UserController.editUser
)

export default router
