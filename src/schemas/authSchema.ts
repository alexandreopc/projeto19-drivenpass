import Joi from "joi";
import { CreateUserData } from "../services/authServices.js";

export const authSchema = Joi.object<CreateUserData>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
