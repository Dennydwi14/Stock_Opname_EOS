import { Router } from "express";
import { deleteOntController, getOntByIdController, getOntController, updateOntController, createOntController } from "./ontsController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { VerifyUser } from "../../middleware/VerifyRole";

const route = Router()

route.get("/", VerifyToken, CatchWrapper(getOntController))
route.get("/:id", VerifyToken, CatchWrapper(getOntByIdController))
route.post("/", VerifyToken, CatchWrapper(createOntController))
route.put("/:id", VerifyUser, CatchWrapper(updateOntController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteOntController))

export default route