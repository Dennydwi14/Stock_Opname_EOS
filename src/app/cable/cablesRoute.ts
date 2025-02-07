import { Router } from "express";
import { deleteCableController, getCableByIdController, getCableController, updateCableController, createCableController } from "./cablesController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";

const route = Router()

route.get("/", VerifyToken, CatchWrapper(getCableController))
route.get("/:id", VerifyToken, CatchWrapper(getCableByIdController))
route.post("/", VerifyToken, CatchWrapper(createCableController))
route.put("/:id", VerifyToken, CatchWrapper(updateCableController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteCableController))

export default route