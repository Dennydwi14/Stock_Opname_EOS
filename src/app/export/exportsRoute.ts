import { Router } from "express";
import { exportOntController, exportStbController } from "./exportsController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyLeader } from "../../middleware/VerifyRole";

const route = Router();

route.post("/ont", VerifyLeader, CatchWrapper(exportOntController));
route.post("/stb", VerifyLeader, CatchWrapper(exportStbController));

export default route;
