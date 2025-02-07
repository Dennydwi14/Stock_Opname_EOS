import { Router } from "express";
import { deleteInventoryController, getInventoryByIdController, getInventoryController, updateInventoryController, createInventoryController } from "./inventoriesController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";

const route = Router()

route.get("/", VerifyToken, CatchWrapper(getInventoryController))
route.get("/:id", VerifyToken, CatchWrapper(getInventoryByIdController))
route.post("/", VerifyToken, CatchWrapper(createInventoryController))
route.put("/:id", VerifyToken, CatchWrapper(updateInventoryController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteInventoryController))

export default route