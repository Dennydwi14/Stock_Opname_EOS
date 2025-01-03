import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/ResponseMapper";
import { InventoryResponseBodyDTO } from "./inventoriesTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createInventoryValidate = async ({
  itemName,
  unit,
  damagedQuantity,
  goodQuantity,
  quantity,
  information,
  notes,
}: InventoryResponseBodyDTO) => {
  if (!itemName) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.ITEM_NAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof itemName !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ITEM_NAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!unit) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.UNIT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (typeof unit !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.UNIT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!quantity) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.QUANTITY,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const quantityNumber = Number(quantity);
  if (isNaN(quantityNumber)) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.QUANTITY,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const damagedQuantityNumber = Number(damagedQuantity);
  if (damagedQuantity) {
    if (isNaN(damagedQuantityNumber)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.DAMAGE_QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  const goodQuantityNumber = Number(goodQuantity);
  if (goodQuantity) {
    if (isNaN(goodQuantityNumber)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.GOOD_QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (
    quantityNumber <
    (damagedQuantityNumber || 0) + (goodQuantityNumber || 0)
  ) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.AMOUNT_QUANTITY,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (information && typeof information !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.INFORMATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (notes && typeof notes !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NOTES,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
};

export const updateInventoryValidate = async ({
  itemName,
  unit,
  damagedQuantity,
  goodQuantity,
  quantity,
  information,
  notes,
}: InventoryResponseBodyDTO) => {
  if (itemName !== undefined && typeof itemName !== "string") {
    if (!itemName) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.ITEM_NAME,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ITEM_NAME,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (unit !== undefined && typeof unit !== "string") {
    if (!unit) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.UNIT,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.UNIT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (quantity !== undefined) {
    if (!quantity) {
      return new ErrorApp(
        MESSAGES.ERROR.REQUIRED.QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    const quantityNumber = Number(quantity);
    if (isNaN(quantityNumber)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (damagedQuantity !== undefined) {
    const damagedQuantityNumber = Number(damagedQuantity);
    if (isNaN(damagedQuantityNumber)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.DAMAGE_QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (goodQuantity !== undefined) {
    const goodQuantityNumber = Number(goodQuantity);
    if (isNaN(goodQuantityNumber)) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.GOOD_QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (
    quantity !== undefined ||
    damagedQuantity !== undefined ||
    goodQuantity !== undefined
  ) {
    const quantityNumber = Number(quantity);
    const damagedQuantityNumber = Number(damagedQuantity);
    const goodQuantityNumber = Number(goodQuantity);
    if (
      quantityNumber <
      (damagedQuantityNumber || 0) + (goodQuantityNumber || 0)
    ) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.AMOUNT_QUANTITY,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (information !== undefined && typeof information !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.INFORMATION,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (notes !== undefined && typeof notes !== "string") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NOTES,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
};
