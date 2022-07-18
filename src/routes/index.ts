import { Router } from "express";

import AuthRouter from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import credentialRouter from "./credentialRouter.js";
import networkRouters from "./networkRouters.js";
import noutesRouter from "./notesRouter.js";

const router = Router();
router.use(AuthRouter);
router.use(credentialRouter);
router.use(noutesRouter);
router.use(cardRouter);
router.use(networkRouters);

export default router;
