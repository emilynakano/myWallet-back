import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import userSchemaValidationMiddlware from "../middlewares/userSchemaValidationMiddlware.js";
const authRouter = Router();

authRouter.post('/sign-up',userSchemaValidationMiddlware, signUp)
authRouter.post('/sign-in', signIn)

export default authRouter