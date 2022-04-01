import bcrypt from "bcryptjs";
import UserType from "../../types/user";

export const hashPass = async (pass: string) => await bcrypt.hash(pass, 8);

export const validatePass = (user: UserType, password: string) => {
  return bcrypt.compare(password, user.password)
}