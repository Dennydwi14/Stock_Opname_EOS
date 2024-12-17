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
  if (type === "stb") {
    const [onts, totalOnts] = await Promise.all([
      getHistoryStb({ page, perPage }),
      getHistoryStbCount(),
    ]);
    data = onts;
    totalData = totalOnts;
  } else {
    const [onts, totalOnts] = await Promise.all([
      getHistoryOnt({ page, perPage }),
      getHistoryOntCount(),
    ]);
    data = onts;
    totalData = totalOnts;
  }

  // if (!onts.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.HISTORY, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: data, meta: Meta(page, perPage, totalData) };
  return response;
};
