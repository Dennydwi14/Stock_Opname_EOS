import { Status } from "@prisma/client";

export interface OntModelTypes {
  serialNumber: string;
  type: string;
  numberWo: string;
  locationId: string;
  unitAddress: string;
  name: string;
  dateActivation: Date;
  status: Status;
  information?: string;
}

export interface OntResponseBodyDTO {
  id?: string;
  serialNumber?: string;
  type?: string;
  numberWo?: string;
  locationId: string;
  unitAddress?: string;
  name?: string;
  dateActivation?: Date;
  status?: Status;
  information?: string;
}

export interface IFilterOnt {
  search?: string;
  page?: number;
  perPage?: number;
  status?: Status;
  locationId?: string;
}
