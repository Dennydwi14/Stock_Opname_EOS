import { IFilterHistory } from "./historiesTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import {
  getHistoryOnt,
  getHistoryOntCount,
  getHistoryStb,
  getHistoryStbCount,
} from "./historiesRepository";
import { Meta } from "../../utils/ResponseMapper";

export const getHistoryService = async ({
  page = 1,
  perPage = 10,
  type,
}: IFilterHistory) => {
  let data, totalData;
  if (type === "Stb") {
    const [stbs, totalStbs] = await Promise.all([
      getHistoryStb({ page, perPage }),
      getHistoryStbCount(),
    ]);
    data = stbs;
    totalData = totalStbs;
  } else {
    const [onts, totalOnts] = await Promise.all([
      getHistoryOnt({ page, perPage }),
      getHistoryOntCount(),
    ]);
    data = onts;
    totalData = totalOnts;
  }

  const response = { data: data, meta: Meta(page, perPage, totalData) };
  return response;
};
