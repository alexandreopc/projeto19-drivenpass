import { Request, Response } from "express";
import credentialServices, {
  CreateCredentialData,
} from "../services/credentialServices.js";

export async function create(req: Request, res: Response) {
  const body = req.body;
  const userId: number = res.locals.userId;
  const data = { ...body, userId };

  await credentialServices.create(data);
  res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  const credentials = await credentialServices.getAll(userId);
  res.send(credentials).status(200);
}

export async function get(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  const credentials = await credentialServices.get(id, userId);
  res.send(credentials).status(200);
}

export async function remove(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  await credentialServices.remove(id, userId);
  res.sendStatus(200);
}
