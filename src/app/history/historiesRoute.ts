import { Router } from "express";
import { getHistoryController } from "./historiesController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router()

route.get("/", VerifyAdmin, CatchWrapper(getHistoryController))

export default route