import { Router } from "express";
import { deleteStbController, getStbByIdController, getStbController, updateStbController, createStbController } from "./stbsController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { VerifyUser } from "../../middleware/VerifyRole";

const route = Router()

route.get("/", VerifyToken, CatchWrapper(getStbController))
route.get("/:id", VerifyToken, CatchWrapper(getStbByIdController))
route.post("/", VerifyToken, CatchWrapper(createStbController))
route.put("/:id", VerifyUser, CatchWrapper(updateStbController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteStbController))

export default route