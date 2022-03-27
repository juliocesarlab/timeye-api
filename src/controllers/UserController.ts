import { Request, Response } from "express";
import User from "../models/user";

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await User.find();

      return res.json(users)
    } catch(err) {
      console.log("Error" + err)
      return res.status(500).json({ error: "Internal server error"})
    }
  }

  async show(req: Request, res: Response) {

  }

  async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      //check if user email already exist
      const user = await User.findOne({ email })
      if (user) return res.status(422).json({ message: `user ${email}, already exists`})

      const createdUser = await User.create({ email, password })

      return res.status(201).json({ createdUser, status: 'success'})
    } catch(err) {

    }
  }

  async update(req: Request, res: Response) {
    
  }

  async destroy(req: Request, res: Response) {
    
  }
}

export default new UserController();