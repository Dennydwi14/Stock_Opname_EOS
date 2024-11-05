import { Router, type Request, type Response } from "express";
import { MESSAGES } from "../utils/Messages";
import locationRoute from "../app/location/locationRoute";
import authRoute from "../app/auth/authRoute";
import toolRoute from "../app/tools/toolsRoute";
import { MESSAGE_CODE } from "../utils/MessageCode";

const route = Router();

route.use("/locations", locationRoute)
route.use("/auth", authRoute)
route.use("/tools", toolRoute)

route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

route.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
        status: 404,
        code: MESSAGE_CODE.NOT_FOUND,
        message: MESSAGES.ERROR.NOT_FOUND.ROUTE
    })
})

export default route