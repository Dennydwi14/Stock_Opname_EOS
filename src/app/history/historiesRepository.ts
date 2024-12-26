import { prisma } from "../../config/prismaConfig";
import {
  IFilterHistory,
  HistoryOntResponseBodyDTO,
  HistoryStbResponseBodyDTO,
} from "./historiesTypes";

// Mengambil daftar pesanan
export const getHistoryOnt = async ({ page, perPage }: IFilterHistory) => {
  return await prisma.historyOnt.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    include: {
      ont: {
        include: {
          location: true,
        },
      },
    },
  });
};

// Menghitung jumlah pesanan
export const getHistoryOntCount = async () => {
  return await prisma.historyOnt.count();
};

// Membuat pesanan
export const createHistoryOnt = async (data: HistoryOntResponseBodyDTO) => {
  return await prisma.historyOnt.create({
    data,
  });
};

export const getHistoryStb = async ({ page, perPage }: IFilterHistory) => {
  return await prisma.historyStb.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    include: {
      stb: {
        include: {
          location: true,
        },
      },
    },
  });
};
export const getHistoryStbCount = async () => {
  return await prisma.historyStb.count();
};

export const createHistoryStb = async (data: HistoryStbResponseBodyDTO) => {
  return await prisma.historyStb.create({
    data,
  });
};
