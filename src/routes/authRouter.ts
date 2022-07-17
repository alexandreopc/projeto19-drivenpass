import { Router } from "express";

import { signin, signup } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { authSchema } from "../schemas/authSchema.js";

const AuthRouter = Router();

AuthRouter.post("/", validateSchemaMiddleware(authSchema), signin);
AuthRouter.post("/signup", validateSchemaMiddleware(authSchema), signup);

export default AuthRouter;
