import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/ResponseMapper";
import { OntResponseBodyDTO } from "./ontsTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createOntValidate = async ({ serialNumber, type, numberWo, unitAddress, name, dateActivation, status, information }: OntResponseBodyDTO) => {
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

    if (!unitAddress) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.UNIT_ADDRESS, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof unitAddress !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.UNIT_ADDRESS, 400, MESSAGE_CODE.BAD_REQUEST);
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

    if (!["Active", "Ready", "Terminate"].includes(status)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.STATUS, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (information && typeof information !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.INFORMATION, 400, MESSAGE_CODE.BAD_REQUEST);
    }
};

export const updateOntValidate = async ({ serialNumber, type, numberWo, unitAddress, name, dateActivation, status, information }: OntResponseBodyDTO) => {
    if (serialNumber !== undefined) {
        if (!serialNumber) {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.SERIAL_NUMBER, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        if (typeof serialNumber !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.SERIAL_NUMBER, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (type !== undefined) {
        if (!type) {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.TYPE, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        if (typeof type !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.TYPE, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (numberWo !== undefined) {
        if (!numberWo) {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.NUMBER_WO, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        if (typeof numberWo !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.NUMBER_WO, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (unitAddress !== undefined) {
        if (!unitAddress) {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.UNIT_ADDRESS, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        if (typeof unitAddress !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.UNIT_ADDRESS, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (name !== undefined) {
        if (!name) {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        if (typeof name !== "string") {
            return new ErrorApp(MESSAGES.ERROR.INVALID.NAME, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (dateActivation !== undefined) {
        if (!dateActivation) {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.DATE_ACTIVATION, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        const activationDate = new Date(dateActivation);
        if (isNaN(activationDate.getTime())) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.DATE_ACTIVATION, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (status !== undefined) {
        if (!status) {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.STATUS, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        if (!["Active", "Ready", "Terminate"].includes(status)) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.STATUS, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (information && typeof information !== "string") {
        return new ErrorApp(MESSAGES.ERROR.INVALID.INFORMATION, 400, MESSAGE_CODE.BAD_REQUEST);
    }
};
