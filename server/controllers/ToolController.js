const Tool = require('../models/Tool')

const getToken = require('../helpers/get-user-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

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
      owner: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
        block: user.block,
        apartment: user.apartment
      }
    })

    images.map(image => {
      tool.images.push(image.filename)
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

  static async showAllUserTools (req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const tools = await Tool.find({ 'user._id': user._id }).sort('-createdAt')

    res.status(200).json({
      tools
    })
  }

  static async showAllUserTakenTools (req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const tools = await Tool.find({ 'taker._id': user._id }).sort('-createdAt')

    res.status(200).json({
      tools
    })
  }

  static async getToolById (req, res) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID!' })
      return
    }

    const tool = await Tool.findOne({_id: id})

    if (!tool) {
      res.status(404).json({ message: 'Tool not found.' })
    }

    res.status(200).json({ tool: tool })
  }
}