import { Router } from "express";
import { deleteToolController, getToolByIdController, getToolController, updateToolController, createToolController } from "./toolsController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router()

route.get("/", VerifyAdmin, CatchWrapper(getToolController))
route.get("/:id", VerifyToken, CatchWrapper(getToolByIdController))
route.post("/", VerifyToken, CatchWrapper(createToolController))
route.put("/:id", VerifyToken, CatchWrapper(updateToolController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteToolController))

export default route