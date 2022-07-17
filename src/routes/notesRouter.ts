import { Router } from "express";

import { create, get, getAll, remove } from "../controllers/notesController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

const noutesRouter = Router();

noutesRouter.post("/note/create", tokenValidationMiddleware, create);
noutesRouter.get("/notes", tokenValidationMiddleware, getAll);
noutesRouter.get("/note/:id", tokenValidationMiddleware, get);
noutesRouter.delete("/note/:id", tokenValidationMiddleware, remove);

export default noutesRouter;
