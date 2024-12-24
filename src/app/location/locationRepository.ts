import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { IFilterLocation, LocationResponseBodyDTO } from "./locationTypes";
import { createCableService } from "../cable/cablesService";
import { v4 as uuidv4 } from "uuid";

export const getLocation = async ({
  page,
  perPage,
  search,
}: IFilterLocation) => {
  const filter = {} as { OR: Prisma.LocationWhereInput[] };

  if (search) {
    filter.OR = [
      {
        location: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.location.findMany({
    where: {
      ...filter,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    // select: {
    //   id: true,
    //   location: true,
    //   email: true,
    //   role: true,
    //   image: true,
    // },
  });
};

export const getLocationCount = async ({ search }: IFilterLocation) => {
  const filter = {} as { OR: Prisma.LocationWhereInput[] };

  if (search) {
    filter.OR = [
      {
        location: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.location.count({
    where: {
      ...filter,
    },
  });
};

export const getLocationByNameLocation = async (location: string) => {
  return await prisma.location.findFirst({
    where: {
      location,
    },
  });
};

export const getLocationById = async (id: string) => {
  return await prisma.location.findFirst({
    where: {
      id,
    },
  });
};

export const createLocation = async (data: LocationResponseBodyDTO) => {
  const locationId = uuidv4();
  const response = await prisma.location.create({
    data: {
      location: data.location as string,
    },
  });
  await Promise.all([
    createCableService({
      quantity: 0,
      size: "",
      type: "Patchcord",
      locationId,
    }),
    createCableService({
      quantity: 0,
      size: "",
      type: "Adaptor",
      locationId,
    }),
  ]);
  return response;
};

export const updateLocation = async (
  id: string,
  data: LocationResponseBodyDTO
) => {
  return await prisma.location.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteLocation = async (id: string) => {
  return await prisma.location.delete({
    where: {
      id,
    },
  });
};
