import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { IFilterInventory, InventoryResponseBodyDTO } from "./inventoriesTypes";

// Mengambil daftar pesanan
export const getInventory = async ({
  page,
  perPage,
  search,
}: IFilterInventory) => {
  const filter = {} as { OR: Prisma.InventoryWhereInput[] };

  if (search) {
    filter.OR = [
      {
        itemName: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.inventory.findMany({
    where: {
      ...filter,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
  });
};

// Menghitung jumlah pesanan
export const getInventoryCount = async ({ search }: IFilterInventory) => {
  const filter = {} as { OR: Prisma.InventoryWhereInput[] };

  if (search) {
    filter.OR = [
      {
        itemName: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.inventory.count({
    where: {
      ...filter,
    },
  });
};

// Mengambil pesanan berdasarkan ID
export const getInventoryById = async (id: string) => {
  return await prisma.inventory.findFirst({
    where: {
      id,
    },
  });
};

// Membuat pesanan
export const createInventory = async (data: InventoryResponseBodyDTO) => {
  return await prisma.inventory.create({
    data: {
      itemName: data.itemName as string,
      unit: data.unit as string,
      quantity: data.quantity as number,
      damagedQuantity: data.damagedQuantity as number,
      goodQuantity: data.goodQuantity as number,
      notes: data.notes as string,
      information: data.information as string,
    },
  });
};

// Memperbarui pesanan
export const updateInventory = async (
  id: string,
  data: InventoryResponseBodyDTO
) => {
  return await prisma.inventory.update({
    where: {
      id,
    },
    data,
  });
};

// Menghapus pesanan
export const deleteInventory = async (id: string) => {
  return await prisma.inventory.delete({
    where: {
      id,
    },
  });
};
