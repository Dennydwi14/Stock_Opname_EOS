export interface InventoryModelTypes {
  itemName: string;
  unit: string;
  quantity: number;
  damagedQuantity: number;
  goodQuantity: number;
  information?: string;
  notes?: string;
}

export interface InventoryResponseBodyDTO {
  id?: string;
  itemName?: string;
  unit?: string;
  quantity?: number;
  damagedQuantity?: number;
  goodQuantity?: number;
  information?: string;
  notes?: string;
}

export interface IFilterInventory {
  search?: string;
  page?: number;
  perPage?: number;
}
