import * as bcrypt from "bcrypt";

export const hashPassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export const comparePassword = async (rawPassword: string, hashPassword: string) => {
  return bcrypt.compare(rawPassword, hashPassword);
}