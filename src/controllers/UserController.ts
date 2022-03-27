import { Request, Response } from "express";

interface UserControllerInterface {
  index(req: Request, res: Response): {},
}

class UserController{
  index(req: Request, res: Response) {
    return res.json({hello: 'world'})
  }
}

export default new UserController();