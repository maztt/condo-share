const router = require('express').Router()
const ToolController = require('../controllers/ToolController')

// Middlewares
const verifyToken = require('../helpers/verify-user-token')

router.post('/create', verifyToken, ToolController.create)

module.exports = router