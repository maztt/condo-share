const router = require('express').Router()
const ToolController = require('../controllers/ToolController')

// Middlewares
const verifyToken = require('../helpers/verify-user-token')
const { imageUpload } = require('../helpers/image-upload')

router.post(
  '/create',
  verifyToken,
  imageUpload.array('images'),
  ToolController.create
)
router.get('/', ToolController.showAll)
router.get('/mytools', verifyToken, ToolController.showAllUserTools)
router.get('/mytakings', verifyToken, ToolController.showAllUserTakenTools)

module.exports = router
