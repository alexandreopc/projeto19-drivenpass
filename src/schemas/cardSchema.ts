import Joi from "joi";
import { CreateCardData } from "../services/cardServices.js";
import { CardType } from "@prisma/client";

export const cardSchema = Joi.object<CreateCardData>({
  number: Joi.string().required(),
  label: Joi.string().required(),
  securityCode: Joi.string().required(),
  expirationDate: Joi.string().required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().required(),
});
