import bcrypt from "bcryptjs";

export const hashEncodePassword = async (password: string) => {
  const encodedPassword = await bcrypt.hash(password, 12);
  return encodedPassword;
};

export const hashVerifPassword: (
  password: string,
  newPassword: string
) => Promise<boolean> = async (password, hashPassword) => {
  const isSamePassword = await bcrypt.compare(password, hashPassword);
  return isSamePassword;
};
