import { Prisma, Status } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { IFilterTool, ToolResponseBodyDTO } from "./toolsTypes";

// Mengambil daftar pesanan
export const getTool = async ({ page, perPage, search, status, locationId }: IFilterTool) => {
  const filter = {} as { OR: Prisma.ToolWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
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
        unit: {
          contains: search,
          mode: "insensitive",
        },
      }
    ];
  }
  return await prisma.tool.findMany({
    where: {
      ...filter,
      status,
      locationId
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    include: {
      location: true,
    }
  });
};

// Menghitung jumlah pesanan
export const getToolCount = async ({ search, status, locationId }: IFilterTool) => {
  const filter = {} as { OR: Prisma.ToolWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
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
        unit: {
          contains: search,
          mode: "insensitive",
        },
      }
    ];
  }
  return await prisma.tool.count({
    where: {
      ...filter,
      status,
      locationId
    },
  });
};

// Mengambil pesanan berdasarkan ID
export const getToolById = async (id: string) => {
  return await prisma.tool.findFirst({
    where: {
      id,
    },
  });
};

// Membuat pesanan
export const createTool = async (data: ToolResponseBodyDTO) => {
  return await prisma.tool.create({
    data: {
      serialNumber: data.serialNumber as string,
      type: data.type as string,
      numberWo: data.numberWo as string,
      instalasiUnit: data.instalasiUnit as string,
      locationId: data.locationId as string,
      unit: data.unit as string,
      name: data.name as string,
      dateActivation: data.dateActivation as Date,
      status: data.status as Status,
      information: data.information as string,
    },
  });
};

// Memperbarui pesanan
export const updateTool = async (id: string, data: ToolResponseBodyDTO) => {
  return await prisma.tool.update({
    where: {
      id,
    },
    data,
  });
};

// Menghapus pesanan
export const deleteTool = async (id: string) => {
  return await prisma.tool.delete({
    where: {
      id,
    },
  });
};

