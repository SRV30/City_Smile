import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required for hashing");
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) {
    return false;
  }

  return bcrypt.compare(plainPassword, hashedPassword);
};

export const isStrongPassword = (password) => {
  if (!password || typeof password !== "string") return false;

  const lengthOk = password.length >= 8;

  return lengthOk;
};
