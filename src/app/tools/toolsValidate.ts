import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/ResponseMapper";
import { ToolResponseBodyDTO } from "./toolsTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createToolValidate = async ({ serialNumber, type, numberWo, instalasiUnit, unit, name, dateActivation, status, information }: ToolResponseBodyDTO) => {
    if (!serialNumber) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.SERIAL_NUMBER, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof serialNumber !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.SERIAL_NUMBER, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!type) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.TYPE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof type !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.TYPE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!numberWo) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NUMBER_WO, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof numberWo !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.NUMBER_WO, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!instalasiUnit) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.INSTALASI_UNIT, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof instalasiUnit !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.INSTALASI_UNIT, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!unit) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.UNIT, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof unit !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.UNIT, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!name) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof name !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.NAME, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!dateActivation) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.DATE_ACTIVATION, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    const activationDate = new Date(dateActivation);
    if (isNaN(activationDate.getTime())) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.DATE_ACTIVATION, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!status) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.STATUS, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!["Active", "Ready", "Back"].includes(status)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.STATUS, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (information && typeof information !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.INFORMATION, 400, MESSAGE_CODE.BAD_REQUEST);
    }
};

export const updateToolValidate = async ({ serialNumber, type, numberWo, instalasiUnit, unit, name, dateActivation, status, information }: ToolResponseBodyDTO) => {
    if (serialNumber) {
        if (typeof serialNumber !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.SERIAL_NUMBER, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (type) {
        if (typeof type !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.TYPE, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (numberWo) {
        if (typeof numberWo !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.NUMBER_WO, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (instalasiUnit) {
        if (typeof instalasiUnit !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.INSTALASI_UNIT, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (unit) {
        if (typeof unit !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.UNIT, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (name) {
        if (typeof name !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.NAME, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (dateActivation) {
        const activationDate = new Date(dateActivation);
        if (isNaN(activationDate.getTime())) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.DATE_ACTIVATION, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (status) {
        if (!["Active", "Ready", "Back"].includes(status)) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.STATUS, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (information && typeof information !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.INFORMATION, 400, MESSAGE_CODE.BAD_REQUEST);
    }
};
