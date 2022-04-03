import bcrypt from "bcryptjs";
import UserType from "../../types/user";

export const hashPass = async (pass: string) => await bcrypt.hash(pass, 8);

export const validatePass = async (user: UserType, password: string) => {
  const result = await bcrypt.compare(password, user.password)
  return result
}