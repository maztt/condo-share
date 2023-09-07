import express, { Router } from 'express'
import UserController from '../controllers/user.controller'
import { verifyToken } from '../helpers/verify-user-token'
import { imageUpload } from '../helpers/image-upload'

const router: Router = express.Router()

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
