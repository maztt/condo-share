import mongoose from 'mongoose'
import Tool from '../models/Tool'
import { Request, Response } from 'express'
import { getUserByToken } from '../helpers/get-user-by-token'
import { getToken } from '../helpers/get-user-token'

const ObjectId = mongoose.Types.ObjectId

class ToolController {
  static async create (req: Request, res: Response) {
    const name = req.body.name
    const category = req.body.category

    const available = true

    const images = req.files

    if (!name) {
      res.status(422).json({ message: 'You must specify the tool name.'})
      return
    }

    if (!category) {
      res.status(422).json({ message: 'You must select the category group.'})
      return
    }

    if (images) {
      if (images.length === 0) {
        res.status(422).json({ message: 'You must upload at least one image of the tool.'})
        return
      }
    }

    const token = getToken(req)
    const user = await getUserByToken(token, res)
    if (!user) return

    const tool = new Tool({
      name,
      category,
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

    if (Array.isArray(images)) {
      images.map((image: { filename: any }) => {
        tool.images.push(image.filename)
      })
    }


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

  static async showAll (req: Request, res: Response) {
    const tools = await Tool.find().sort('-createdAt')

    res.status(200).json({
      tools: tools
    })
  }

  static async showAllUserTools (req: Request, res: Response) {
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    const tools = await Tool.find({ 'owner._id': user._id }).sort('-createdAt')

    res.status(200).json({
      tools
    })
  }

  static async showAllUserTakenTools (req: Request, res: Response) {
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    const tools = await Tool.find({ 'taker._id': user._id }).sort('-createdAt')

    res.status(200).json({
      tools
    })
  }

  static async getToolById (req: Request, res: Response) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID!' })
      return
    }

    const tool = await Tool.findOne({_id: id})

    if (!tool) {
      res.status(404).json({ message: 'Tool was not found.' })
    }

    res.status(200).json({ tool: tool })
  }

  static async removeToolById (req: Request, res: Response) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID!' })
      return
    }

    const tool = await Tool.findOne({ _id: id })

    if (!tool) {
      res.status(404).json({ message: 'Tool was not found.' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (tool.owner._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'You do not own this tool.' })
      return
    }

    await Tool.findByIdAndDelete(id)

    res.status(200).json({ message: 'Tool was successfuly removed from the system.' })
  }

  static async editTool (req: Request, res: Response) {
    const id = req.params.id

    const { name, category, available } = req.body
    const images = req.files

    const updatedData: any = {}

    const tool = await Tool.findOne({ _id: id })

    if (!tool) {
      res.status(404).json({ message: 'Tool was not found.'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (tool.owner._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'You do not own this tool.' })
      return
    }

    if (!name) {
      res.status(422).json({ message: 'You must specify the tool name.'})
      return
    } else {
      updatedData.name = name
    }

    if (!category) {
      res.status(422).json({ message: 'You must select the category group.'})
      return
    } else {
      updatedData.category = category
    }

    if (images !== undefined) {
      if (Array.isArray(images)) {
        updatedData.images = []
        images.map(image => {
          updatedData.images.push(image.filename)
        })
      }
    }

    await Tool.findByIdAndUpdate(id, updatedData)

    res.status(200).json({ message: 'The tool was updated.' })
  }

  static async schedule (req: Request, res: Response) {
    const id = req.params.id

    const tool = await Tool.findOne({ _id: id })

    if (!tool) {
      res.status(404).json({ message: 'Tool was not found.'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (tool.owner._id.equals(user._id)) {
      res.status(422).json({ message: 'You can not claim your own tool.' })
      return
    }

    if (tool.taker) {
      if (tool.taker._id.equals(user._id)) {
        res.status(422).json({ message: 'You have already claimed this tool.' })
        return
      }
    }

    tool.taker = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Tool.findByIdAndUpdate(id, tool)

    res.status(200).json({ message: `You have claimed the tool from ${tool.owner.name}!` })
  }

  static async conclude (req: Request, res: Response) {
    const id = req.params.id

    const tool = await Tool.findOne({ _id: id })

    if (!tool) {
      res.status(404).json({ message: 'Tool was not found.'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (tool.owner._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'You do not own this tool.' })
    }

    tool.available = false

    await Tool.findByIdAndUpdate(id, tool)

    res.status(200).json({ message: `You have confirmed the claim from ${tool.taker.name}` })
  }
}

export default ToolController
