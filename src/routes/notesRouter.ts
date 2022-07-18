import { Router } from "express";

import { create, get, getAll, remove } from "../controllers/notesController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { noteSchema } from "../schemas/noteSchema.js";

const noutesRouter = Router();

noutesRouter.post(
  "/note/create",
  validateSchemaMiddleware(noteSchema),
  tokenValidationMiddleware,
  create
);
noutesRouter.get("/notes", tokenValidationMiddleware, getAll);
noutesRouter.get("/note/:id", tokenValidationMiddleware, get);
noutesRouter.delete("/note/:id", tokenValidationMiddleware, remove);

export default noutesRouter;
