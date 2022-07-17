import { Router } from "express";

import AuthRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import noutesRouter from "./notesRouter.js";

const router = Router();
router.use(AuthRouter);
router.use(credentialRouter);
router.use(noutesRouter);

export default router;
