export interface LocationModelTypes {
  location: string;
}

export interface LocationResponseBodyDTO {
  id?: string;
  location?: string;
}

export interface IFilterLocation {
  search?: string;
  page?: number;
  perPage?: number;
}
