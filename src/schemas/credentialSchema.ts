import Joi from "joi";
import { CreateCredentialData } from "../services/credentialServices.js";

export const credentialSchema = Joi.object<CreateCredentialData>({
  label: Joi.string().required(),
  url: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
});
