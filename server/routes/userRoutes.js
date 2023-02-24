const router = require('express').Router()
const UserController = require('../controllers/UserController')

// Middlewares
const verifyToken = require('../helpers/verify-user-token')
const { imageUpload } = require('../helpers/image-upload')

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

module.exports = router
