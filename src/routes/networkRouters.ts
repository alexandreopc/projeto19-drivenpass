import { Router } from "express";

import {
  create,
  get,
  getAll,
  remove,
} from "../controllers/networkController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { networkSchema } from "../schemas/networkSchema.js";

const networkRouters = Router();

networkRouters.post(
  "/network/create",
  validateSchemaMiddleware(networkSchema),
  tokenValidationMiddleware,
  create
);
networkRouters.get("/networks", tokenValidationMiddleware, getAll);
networkRouters.get("/network/:id", tokenValidationMiddleware, get);
networkRouters.delete("/network/:id", tokenValidationMiddleware, remove);

export default networkRouters;
