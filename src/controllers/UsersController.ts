import { Request, Response } from "express";
import User from "../models/user";
import { hashPass } from '../services/authentication/encrypt';
import UsersServices from "../services/users/UsersServices";

class UsersController {
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
    try {
      const id = req.params.id
      
      const user = await UsersServices.verifyIfExistsById(id)

      if (!user) return res.status(404).json({message: `User ${id} not exists`, status: "failure"})

      res.status(302).json({user, status: "success"})

    } catch(e) {
      return res.status(500).json({ error: "Internal server error", status: "failure"})
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      //check if user email already exist
      const user = await User.findOne({ email })
      if (user) return res.status(422).json({ message: `user ${email} already exists`, status: "failure"})

      const encryptedPass = await hashPass(password)

      const createdUser = await User.create({ email, password: encryptedPass })

      return res.status(201).json({ createdUser, status: 'success'})
    } catch(err) {
      return res.status(500).json({message: "internal server error", status: "failure"})
    }
  }

  async update(req: Request, res: Response) {
    
    try {
      const { id } = req.params;
      const {email, password} = req.body;

      const user = await UsersServices.verifyIfExistsById(id)
      if (!user) return res.status(404).json({message: `User ${id} not exists`, status: "failure"})

      const encryptedPass  = await hashPass(password)
      await user.updateOne({email, password: encryptedPass})

      return res.status(200).json({status: "success"})

    } catch (e) {
      return res.status(500).json({message: "internal server error", status: "failure"})
    }
    
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UsersServices.verifyIfExistsById(id)
      if (!user) return res.status(404).json({message: `User ${id} not exists`, status: "failure"})
  
      user.deleteOne();
  
      return res.status(200).json({status: 'success'})
    } catch (e) {
      return res.status(500).json({message: "internal server error", status: "failure"})
    }
  }
}

export default new UsersController();