const Tool = require('../models/Tool')

const getToken = require('../helpers/get-user-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class ToolController {
  static async create(req, res) {
    const name = req.body.name

    const available = true

    const images = req.files

    if (!name) {
      res.status(422).json({ message: 'You must specify the tool name.'})
      return
    }

    if (images.length === 0) {
      res.status(422).json({ message: 'You must upload at least one image of the tool.'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    const tool = new Tool({
      name,
      images: [],
      available,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone
      }
    })

    try {
      const newTool = await tool.save()
      res.status(201).json({
        message: 'The tool is now available for everyone.',
        newTool
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async showAll (req, res) {
    const tools = await Tool.find().sort('-createdAt')

    res.status(200).json({
      tools: tools
    })
  }
}