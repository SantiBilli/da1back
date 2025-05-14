import { Router } from "express";
import { changePasswordCTL, forgotPasswordCTL } from "../../controllers/password-recovery/forgot-password.js";

const forgotPasswordRouter = Router();

forgotPasswordRouter.post("/forgot-password", forgotPasswordCTL);
forgotPasswordRouter.post("/reset-password/:token", changePasswordCTL);



export default forgotPasswordRouter;