import Joi from "joi";
import { CreateNoteData } from "../services/noteServices.js";

export const noteSchema = Joi.object<CreateNoteData>({
  title: Joi.string().max(50).required(),
  body: Joi.string().max(1000).required(),
});
