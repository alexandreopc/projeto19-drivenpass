import Joi from "joi";
import { CreateNetworkData } from "../services/networkServices.js";

export const networkSchema = Joi.object<CreateNetworkData>({
  label: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});
