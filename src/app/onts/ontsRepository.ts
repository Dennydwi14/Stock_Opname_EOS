import { Prisma, Status } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { IFilterOnt, OntResponseBodyDTO } from "./ontsTypes";
import { createHistoryOnt } from "../history/historiesRepository";
import { v4 as uuidv4 } from "uuid";

// Mengambil daftar pesanan
export const getAllOnt = async ({ locationId }: IFilterOnt) => {
  return await prisma.ont.findMany({
    where: {
      locationId,
    },
    include: {
      location: true,
    },
  });
};

export const getOnt = async ({
  page,
  perPage,
  search,
  status,
  locationId,
}: IFilterOnt) => {
  const filter = {} as { OR: Prisma.OntWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        type: {
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
  return await prisma.ont.findMany({
    where: {
      ...filter,
      status,
      locationId,
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
export const getOntCount = async ({
  search,
  status,
  locationId,
}: IFilterOnt) => {
  const filter = {} as { OR: Prisma.OntWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        type: {
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
  return await prisma.ont.count({
    where: {
      ...filter,
      status,
      locationId,
    },
  });
};

// Mengambil pesanan berdasarkan ID
export const getOntById = async (id: string) => {
  return await prisma.ont.findFirst({
    where: {
      id,
    },
  });
};

// Membuat pesanan
export const createOnt = async (data: OntResponseBodyDTO) => {
  const ontId = uuidv4();
  const response = await prisma.ont.create({
    data: {
      id: ontId,
      serialNumber: data.serialNumber as string,
      type: data.type as string,
      numberWo: data.numberWo as string,
      locationId: data.locationId as string,
      unitAddress: data.unitAddress as string,
      name: data.name as string,
      dateActivation: data.dateActivation as Date,
      status: data.status as Status,
      information: data.information as string,
    },
  });
  await createHistoryOnt({
    activity: "Create Optical Network Terminal",
    key: "create",
    ontId: ontId,
  });
  return response;
};

// Memperbarui pesanan
export const updateOnt = async (id: string, data: OntResponseBodyDTO) => {
  const response = await prisma.ont.update({
    where: {
      id,
    },
    data,
  });

  if (data.status) {
    await createHistoryOnt({
      activity: `Update Optical Network Terminal status to be ${data.status}`,
      key: "update",
      ontId: id,
    });
  }
  return response;
};

// Menghapus pesanan
export const deleteOnt = async (id: string) => {
  return await prisma.ont.delete({
    where: {
      id,
    },
  });
};
