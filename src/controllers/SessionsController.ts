import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../configs/auth";
import User from "../models/user";
import { validatePass } from "../services/authentication/encrypt";

class SessionsController {
  
  async create(req: Request, res: Response) {
    try {
      const { email, password } =  req.body;
      const user = await User.findOne({ email }) // same as email: email
  
      if (!user) 
        return res.status(401).json({ message: "Invalid email or password", status: "failure" })
      if (!await validatePass(user, password)) 
        return res.status(401).json({ message: "Invalid email or password", status: "failure" })
    
      const { id } = user
  
      return res.json({
        user: {
          id,
          email
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      })
    } catch (e) {
      return res.status(500).json({})
    }
  }
}

export default new SessionsController()