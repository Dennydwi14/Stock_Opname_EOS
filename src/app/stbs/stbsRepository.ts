import { Prisma, Status } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { IFilterStb, StbResponseBodyDTO } from "./stbsTypes";
import { createHistoryStb } from "../history/historiesRepository";
import { v4 as uuidv4 } from "uuid";

// Mengambil daftar pesanan
export const getStb = async ({
  page,
  perPage,
  search,
  status,
  locationId,
  deviceLocation,
}: IFilterStb) => {
  const filter = {} as { OR: Prisma.StbWhereInput[] };

  if (search) {
    filter.OR = [
      {
        type: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        packageName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        serialNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        unitAddress: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.stb.findMany({
    where: {
      ...filter,
      status,
      locationId,
      deviceLocation,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    include: {
      location: true,
    },
  });
};

// Menghitung jumlah pesanan
export const getStbCount = async ({
  search,
  status,
  locationId,
  deviceLocation,
}: IFilterStb) => {
  const filter = {} as { OR: Prisma.StbWhereInput[] };

  if (search) {
    filter.OR = [
      {
        type: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        packageName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        serialNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        unitAddress: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.stb.count({
    where: {
      ...filter,
      status,
      locationId,
      deviceLocation,
    },
  });
};

// Mengambil pesanan berdasarkan ID
export const getStbById = async (id: string) => {
  return await prisma.stb.findFirst({
    where: {
      id,
    },
  });
};

// Membuat pesanan
export const createStb = async (data: StbResponseBodyDTO) => {
  const stbId = uuidv4();
  const response = await prisma.stb.create({
    data: {
      id: stbId,
      serialNumber: data.serialNumber as string,
      type: data.type as string,
      numberWo: data.numberWo as string,
      locationId: data.locationId as string,
      unitAddress: data.unitAddress as string,
      deviceId: data.deviceId as string,
      deviceLocation: data.deviceLocation as Status,
      packageName: data.packageName as string,
      notes: data.notes as string,
      dateActivation: data.dateActivation as Date,
      status: data.status as Status,
      information: data.information as string,
    },
  });
  await createHistoryStb({
    activity: "Create Set Top Box",
    key: "create",
    stbId: stbId,
  });
  return response;
};

// Memperbarui pesanan
export const updateStb = async (id: string, data: StbResponseBodyDTO) => {
  const response = await prisma.stb.update({
    where: {
      id,
    },
    data,
  });

  if (data.status) {
    await createHistoryStb({
      activity: `Update Set Top Box status to be ${data.status}`,
      key: "update",
      stbId: id,
    });
  }
  return response;
};

// Menghapus pesanan
export const deleteStb = async (id: string) => {
  return await prisma.stb.delete({
    where: {
      id,
    },
  });
};
