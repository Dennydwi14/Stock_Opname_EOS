import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import {
  changePasswordController,
  checkToken,
  deleteUserController,
  getUserByIdController,
  getUserController,
  loginController,
  registerController,
  updateUserController,
} from "./authController";
import { VerifyToken } from "../../middleware/verifyToken";
import { VerifyAdmin } from "../../middleware/VerifyRole";

const route = Router();

route.post("/login", CatchWrapper(loginController));
route.post("/register", VerifyAdmin, CatchWrapper(registerController));
route.post("/user", VerifyAdmin, CatchWrapper(registerController));
route.get("/user", VerifyAdmin, CatchWrapper(getUserController));
route.get("/user/:id", VerifyAdmin, CatchWrapper(getUserByIdController));
route.put("/user/:id", VerifyAdmin, CatchWrapper(updateUserController));
route.delete("/user/:id", VerifyAdmin, CatchWrapper(deleteUserController));
route.put(
  "/user/password/:id",
  VerifyAdmin,
  CatchWrapper(changePasswordController)
);
route.post("/check-token", VerifyToken, CatchWrapper(checkToken));

export default route;
