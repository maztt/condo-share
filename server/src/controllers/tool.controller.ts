import mongoose from 'mongoose'
import Tool from '../models/Tool'
import { Request, Response } from 'express'
import { getUserByToken } from '../helpers/get-user-by-token'
import { getToken } from '../helpers/get-user-token'
import User from '../models/User'

const ObjectId = mongoose.Types.ObjectId

class ToolController {
  static async create(req: Request, res: Response) {
    const name = req.body.name
    const category = req.body.category
    const available = true
    const images = req.files

    if (!name) {
      return res.status(400).json({ message: 'You must specify the tool name.' })
    }

    if (!category) {
      return res.status(400).json({ message: 'You must select the category group.' })
    }

    if (images) {
      if (images.length === 0) {
        return res.status(400).json({ message: 'You must upload at least one image of the tool.' })
      }
    }

    const token = getToken(req)
    const user = await getUserByToken(token, res)
    if (!user) return res.status(500).json({ message: 'Failed to retrieve user, try relogging.' })

    const tool = new Tool({
      name,
      category,
      images: [],
      available,
      owner: await User.findOne(user._id)
    })

    console.log(tool)

    if (Array.isArray(images)) {
      images.map((image: { filename: any }) => {
        tool.images.push(image.filename)
      })
    }

    try {
      const newTool = await tool.save()
      return res.status(201).json({
        message: 'The tool is now available for everyone.',
        newTool
      })
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static async showAll(req: Request, res: Response) {
    const tools = await Tool.find().sort('-createdAt').populate('owner');
    return res.status(200).json({ tools: tools })
  }

  static async showAllUserTools(req: Request, res: Response) {
    const token = getToken(req)
    const user = await getUserByToken(token, res)
    const tools = await Tool.find({ 'owner._id': user._id }).sort('-createdAt')
    return res.status(200).json({ tools })
  }

  static async showAllUserTakenTools(req: Request, res: Response) {
    const token = getToken(req)
    const user = await getUserByToken(token, res)
    const tools = await Tool.find({ 'claimer._id': user._id }).sort('-createdAt')
    return res.status(200).json({ tools })
  }

  static async getToolById(req: Request, res: Response) {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID!' })
    }
    const tool = await Tool.findOne({ _id: id })
    if (!tool) {
      return res.status(404).json({ message: 'Tool was not found.' })
    }
    return res.status(200).json({ tool: tool })
  }

  static async removeToolById(req: Request, res: Response) {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID!' })
    }
    const tool = await Tool.findOne({ _id: id })
    if (!tool) {
      return res.status(404).json({ message: 'Tool was not found.' })
    }
    const token = getToken(req)
    const user = await getUserByToken(token, res)
    if (tool.owner._id.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'You do not own this tool.' })
    }
    await Tool.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Tool was successfuly removed from the system.' })
  }

  static async editTool(req: Request, res: Response) {
    const id = req.params.id
    const { name, category, available } = req.body
    const images = req.files
    const updatedData: any = {}
    const tool = await Tool.findOne({ _id: id })
    if (!tool) {
      return res.status(404).json({ message: 'Tool was not found.' })
    }
    const token = getToken(req)
    const user = await getUserByToken(token, res)
    if (tool.owner._id.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'You do not own this tool.' })
    }
    if (!name) {
      return res.status(400).json({ message: 'You must specify the tool name.' })
    }
    if (!category) {
      return res.status(400).json({ message: 'You must select the category group.' })
    }
    updatedData.name = name
    updatedData.category = category
    if (images !== undefined) {
      if (Array.isArray(images)) {
        updatedData.images = []
        images.map(image => {
          updatedData.images.push(image.filename)
        })
      }
    }
    await Tool.findByIdAndUpdate(id, updatedData)
    return res.status(200).json({ message: 'The tool was updated.' })
  }

  static async schedule(req: Request, res: Response) {
    const id = req.params.id
    const tool = await Tool.findOne({ _id: id })
    if (!tool) {
      return res.status(404).json({ message: 'Tool was not found.' })
    }
    const token = getToken(req)
    const user = await getUserByToken(token, res)
    if (tool.owner._id.equals(user._id)) {
      return res.status(400).json({ message: 'You can not claim your own tool.' })
    }
    if (tool.claimer) {
      if (tool.claimer._id.equals(user._id)) {
        return res.status(400).json({ message: 'You have already claimed this tool.' })
      }
    }
    tool.claimer = await User.findById(user._id)
    await Tool.findByIdAndUpdate(id, tool)
    return res.status(200).json({ message: `You have claimed the tool from ${tool.owner.name}!` })
  }

  static async conclude(req: Request, res: Response) {
    const id = req.params.id
    const tool = await Tool.findOne({ _id: id })
    if (!tool) {
      return res.status(404).json({ message: 'Tool was not found.' })
    }
    const token = getToken(req)
    const user = await getUserByToken(token, res)
    if (tool.owner._id.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'You do not own this tool.' })
    }
    tool.available = false
    await Tool.findByIdAndUpdate(id, tool)
    return res.status(200).json({ message: `You have confirmed the claim from ${tool.claimer.name}` })
  }
}

export default ToolController
