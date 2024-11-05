import { Status } from "@prisma/client";

export interface ToolModelTypes {
  serialNumber: string;
  type: string;
  numberWo: string;
  instalasiUnit: string;
  locationId: string;
  unit: string;
  name: string;
  dateActivation: Date;
  status: Status;
  information?: string;
}

export interface ToolResponseBodyDTO {
  id?: string;
  serialNumber?: string;
  type?: string;
  numberWo?: string;
  instalasiUnit?: string;
  locationId: string;
  unit?: string;
  name?: string;
  dateActivation?: Date;
  status?: Status;
  information?: string;
}

export interface IFilterTool {
  search?: string;
  page?: number;
  perPage?: number;
  status?: Status;
  locationId?: string;
}
