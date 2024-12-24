import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/ResponseMapper";
import {
  InventoryModelTypes,
  IFilterInventory,
  InventoryResponseBodyDTO,
} from "./inventoriesTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  getInventoryCount,
  updateInventory,
} from "./inventoriesRepository";
import {
  createInventoryValidate,
  updateInventoryValidate,
} from "./inventoriesValidate";

export const getInventoryService = async ({
  search,
  page = 1,
  perPage = 10,
}: IFilterInventory) => {
  const [onts, totalData] = await Promise.all([
    getInventory({ search, page, perPage }),
    getInventoryCount({ search }),
  ]);

  // if (!onts.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ONT, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: onts, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getInventoryByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const ont = await getInventoryById(id);
  if (!ont) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ONT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  return ont;
};

export const createInventoryService = async ({
  itemName,
  unit,
  quantity,
  damagedQuantity,
  goodQuantity,
  notes,
  information,
}: InventoryModelTypes) => {
  const validate = await createInventoryValidate({
    itemName,
    unit,
    damagedQuantity,
    goodQuantity,
    quantity,
    information,
    notes,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const response = await createInventory({
    itemName,
    unit,
    damagedQuantity,
    goodQuantity,
    quantity,
    information,
    notes,
  });
  return response;
};

export const updateInventoryService = async ({
  id,
  itemName,
  unit,
  damagedQuantity,
  goodQuantity,
  quantity,
  information,
  notes,
}: InventoryResponseBodyDTO) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const ont = await getInventoryById(id);
  if (!ont) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ONT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const validate = await updateInventoryValidate({
    itemName,
    unit,
    damagedQuantity,
    goodQuantity,
    quantity,
    information,
    notes,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const updatedFields: Partial<InventoryModelTypes> = {};

  if (itemName !== undefined) updatedFields.itemName = itemName;
  if (unit !== undefined) updatedFields.unit = unit;
  if (damagedQuantity !== undefined) updatedFields.damagedQuantity = Number(damagedQuantity);
  if (goodQuantity !== undefined) updatedFields.goodQuantity = Number(goodQuantity);
  if (quantity !== undefined) updatedFields.quantity = Number(quantity);
  if (information !== undefined) updatedFields.information = information;
  if (notes !== undefined) updatedFields.notes = notes;

  const response = await updateInventory(id, { ...updatedFields });
  return response;
};

export const deleteInventoryService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const ont = await getInventoryById(id);
  if (!ont) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ONT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const response = await deleteInventory(id);
  return response;
};
