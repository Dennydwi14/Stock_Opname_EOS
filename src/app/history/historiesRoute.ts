import { Router } from "express";
import { getHistoryController } from "./historiesController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";

const route = Router()

route.get("/", VerifyToken, CatchWrapper(getHistoryController))

export default route