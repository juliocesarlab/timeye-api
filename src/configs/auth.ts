import "dotenv/config"
import jwt  from "jsonwebtoken"

export default {
  secret: process.env.SECRET as jwt.Secret,
  expiresIn: "7d"
}