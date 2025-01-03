export interface HistoryOntResponseBodyDTO {
  ontId: string;
  keyword: string;
  activity: string;
}

export interface HistoryStbResponseBodyDTO {
  stbId: string;
  keyword: string;
  activity: string;
}

export interface IFilterHistory {
  type?: string;
  page?: number;
  perPage?: number;
}
