import { prisma } from "../../config/prismaConfig";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};