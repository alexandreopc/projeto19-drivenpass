import { Router } from "express";

import {
  create,
  get,
  getAll,
  remove,
} from "../controllers/credentialController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { credentialSchema } from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post(
  "/credential/create",
  validateSchemaMiddleware(credentialSchema),
  tokenValidationMiddleware,
  create
);
credentialRouter.get("/credentials", tokenValidationMiddleware, getAll);
credentialRouter.get("/credentials/:id", tokenValidationMiddleware, get);
credentialRouter.delete("/credentials/:id", tokenValidationMiddleware, remove);

export default credentialRouter;
