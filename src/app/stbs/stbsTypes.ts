import { Status } from "@prisma/client";

export interface StbModelTypes {
  serialNumber: string;
  type: string;
  deviceId: string;
  numberWo: string;
  locationId: string;
  unitAddress: string;
  packageName: string;
  status: string;
  dateActivation: Date;
  deviceLocation: Status;
  information?: string;
  notes?: string;
}

export interface StbResponseBodyDTO {
  id?: string;
  serialNumber?: string;
  type?: string;
  deviceId?: string;
  numberWo?: string;
  locationId: string;
  unitAddress?: string;
  packageName?: string;
  status?: string;
  dateActivation?: Date;
  deviceLocation?: Status;
  information?: string;
  notes?: string;
}

export interface IFilterStb {
  search?: string;
  page?: number;
  perPage?: number;
  status?: string;
  locationId?: string;
  deviceLocation?: Status;
}
