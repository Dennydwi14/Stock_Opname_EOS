export interface HistoryOntResponseBodyDTO {
  ontId: string;
  key: string;
  activity: string;
}

export interface HistoryStbResponseBodyDTO {
  stbId: string;
  key: string;
  activity: string;
}

export interface IFilterHistory {
  type?: string;
  page?: number;
  perPage?: number;
}
