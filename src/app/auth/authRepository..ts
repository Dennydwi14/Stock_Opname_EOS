import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { IFilterUser, RegisterAuthBodyDTO } from "./authTypes";

export const getUser = async ({ page, perPage, search, role }: IFilterUser) => {
  const filter = {} as { OR: Prisma.UserWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.user.findMany({
    where: {
      ...filter,
      role,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserCount = async ({ search, role }: IFilterUser) => {
  const filter = {} as { OR: Prisma.UserWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.user.count({
    where: {
      ...filter,
      role,
    },
  });
};

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

export const createUser = async ({
  email,
  name,
  password,
  role,
}: RegisterAuthBodyDTO) => {
  return await prisma.user.create({
    data: {
      email,
      name,
      password,
      role,
    },
    select: {
      id: true,
    },
  });
};

export const updateUser = async (
  id: string,
  data: Partial<RegisterAuthBodyDTO>
) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
