import { Router } from "express";
import { exportOntController, exportStbController } from "./exportsController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";

const route = Router();

route.post("/ont", VerifyToken, CatchWrapper(exportOntController));
route.post("/stb", VerifyToken, CatchWrapper(exportStbController));

export default route;
