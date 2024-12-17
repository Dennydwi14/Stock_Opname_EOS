import { TypeCable } from "@prisma/client";

export interface CableModelTypes {
  type: TypeCable;
  quantity: number;
  size: string;
  locationId: string;
}

export interface CableResponseBodyDTO {
  id?: string;
  type?: TypeCable;
  quantity?: number;
  size?: string;
  locationId: string;
}

export interface IFilterCable {
  type?: TypeCable;
  page?: number;
  perPage?: number;
  locationId?: string;
}
