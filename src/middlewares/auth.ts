import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../configs/auth";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({message: "Token was not provided", status: "failure"})

  const [,token] = authHeader.split(' ') //return ['Bearer', 'token']

  try {
    const decoded = await promisify(jwt.verify as any)(token, authConfig.secret) as any
    req.userId = decoded.id

    next()
  } catch(err) {
    return res.status(401).json({message: "Invalid Token", status: "failure"})
  }
}