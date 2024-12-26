import { Router } from "express";
import { exportOntController, exportStbController } from "./exportsController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router();

route.post("/ont", VerifyAdmin, CatchWrapper(exportOntController));
route.post("/stb", VerifyAdmin, CatchWrapper(exportStbController));

export default route;
