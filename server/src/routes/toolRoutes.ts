import express, { Router } from 'express'
import ToolController from '../controllers/ToolController'
import { verifyToken } from '../helpers/verify-user-token'
import { imageUpload } from '../helpers/image-upload'

const router: Router = express.Router()

router.post(
  '/create',
  verifyToken,
  imageUpload.array('images'),
  ToolController.create
)
router.get('/', ToolController.showAll)
router.get('/mytools', verifyToken, ToolController.showAllUserTools)
router.get('/mytakings', verifyToken, ToolController.showAllUserTakenTools)
router.get('/:id', ToolController.getToolById)
router.delete('/:id', verifyToken, ToolController.removeToolById)
router.patch(
  '/:id',
  verifyToken,
  imageUpload.array('images'),
  ToolController.editTool
)
router.patch('/schedule/:id', verifyToken, ToolController.schedule)
router.patch('/conclude/:id', verifyToken, ToolController.conclude)

export default router
