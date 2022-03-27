import bcrypt from "bcryptjs"

export const hashPass = async (pass: string) => {
  const encryptedPass = await bcrypt.hash(pass, 8)
  return encryptedPass
}