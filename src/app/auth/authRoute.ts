import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { checkToken, deleteUserController, getUserController, loginController, registerController, updateUserController } from "./authController";
import { VerifyToken } from "../../middleware/verifyToken";
import { VerifyAdmin } from "../../middleware/VerifyRole";

const route = Router();

route.post("/login", CatchWrapper(loginController));
route.post("/register", VerifyAdmin, CatchWrapper(registerController));
route.post("/user/", VerifyAdmin, CatchWrapper(getUserController));
route.put("/user/:id", VerifyAdmin, CatchWrapper(updateUserController));
route.delete("/user/:id", VerifyAdmin, CatchWrapper(deleteUserController));
route.post("/check-token", VerifyToken, CatchWrapper(checkToken));

export default route;
