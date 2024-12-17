import { TypeCable } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { IFilterCable, CableResponseBodyDTO } from "./cablesTypes";

// Mengambil daftar pesanan
export const getCable = async ({
  page,
  perPage,
  type,
  locationId,
}: IFilterCable) => {
  return await prisma.cable.findMany({
    where: {
      type,
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
export const getCableCount = async ({ type, locationId }: IFilterCable) => {
  return await prisma.cable.count({
    where: {
      type,
      locationId,
    },
  });
};

// Mengambil pesanan berdasarkan ID
export const getCableById = async (id: string) => {
  return await prisma.cable.findFirst({
    where: {
      id,
    },
  });
};

// Membuat pesanan
export const createCable = async (data: CableResponseBodyDTO) => {
  return await prisma.cable.create({
    data: {
      quantity: data.quantity as number,
      locationId: data.locationId as string,
      type: data.type as TypeCable,
      size: data.size as string,
    },
  });
};

// Memperbarui pesanan
export const updateCable = async (id: string, data: CableResponseBodyDTO) => {
  return await prisma.cable.update({
    where: {
      id,
    },
    data,
  });
};

// Menghapus pesanan
export const deleteCable = async (id: string) => {
  return await prisma.cable.delete({
    where: {
      id,
    },
  });
};
