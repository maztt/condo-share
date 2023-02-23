const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/check', UserController.check)
router.get('/:id', UserController.getUserById)

module.exports = router