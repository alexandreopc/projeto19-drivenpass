import { Router } from "express";

import { create, get, getAll, remove } from "../controllers/cardsController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { cardSchema } from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/card/create",
  validateSchemaMiddleware(cardSchema),
  tokenValidationMiddleware,
  create
);
cardRouter.get("/cards", tokenValidationMiddleware, getAll);
cardRouter.get("/card/:id", tokenValidationMiddleware, get);
cardRouter.delete("/card/:id", tokenValidationMiddleware, remove);

export default cardRouter;
