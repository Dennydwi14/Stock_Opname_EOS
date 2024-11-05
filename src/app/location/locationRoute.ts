import { Router } from "express";
import { createLocationController, deleteLocationController, getLocationByIdController, getLocationController, updateLocationController } from "./locationController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";

const route = Router()

route.get("/", VerifyToken, CatchWrapper(getLocationController))
route.get("/:id", VerifyToken, CatchWrapper(getLocationByIdController))
route.post("/", VerifyToken, CatchWrapper(createLocationController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteLocationController))
route.put("/:id", VerifyToken, CatchWrapper(updateLocationController))

export default route