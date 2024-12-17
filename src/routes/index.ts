import { Router, type Request, type Response } from "express";
import { MESSAGES } from "../utils/Messages";
import locationRoute from "../app/location/locationRoute";
import authRoute from "../app/auth/authRoute";
import ontRoute from "../app/onts/ontsRoute";
import stbRoute from "../app/stbs/stbsRoute";
import inventoryRoute from "../app/inventory/inventoriesRoute";
import historyRoute from "../app/history/historiesRoute";
import { MESSAGE_CODE } from "../utils/MessageCode";

const route = Router();

route.use("/locations", locationRoute);
route.use("/auth", authRoute);
route.use("/onts", ontRoute);
route.use("/stbs", stbRoute);
route.use("/inventories", inventoryRoute);
route.use("/histories", historyRoute);

route.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World 🚀" });
});

route.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    code: MESSAGE_CODE.NOT_FOUND,
    message: MESSAGES.ERROR.NOT_FOUND.ROUTE,
  });
});

export default route;
