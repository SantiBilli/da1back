import { Router } from "express";
import { validateToken } from "../../middlewares/authenticator.js";
import { changePasswordCTL } from "../../controllers/profile/change-password.js";

const changePasswordRouter = Router();

changePasswordRouter.post("/change-password", validateToken, changePasswordCTL);

export default changePasswordRouter;