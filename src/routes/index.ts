import { Router } from "express";

import AuthRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";

const router = Router();
router.use(AuthRouter);
router.use(credentialRouter);

export default router;
