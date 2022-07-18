import { Request, Response } from "express";
import networkServices, {
  CreateNetworkData,
} from "../services/networkServices.js";

export async function create(req: Request, res: Response) {
  const body = req.body;
  const userId: number = res.locals.userId;
  const data: CreateNetworkData = { ...body, userId };

  await networkServices.create(data);
  res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  const networks = await networkServices.getAll(userId);
  res.send(networks).status(200);
}

export async function get(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  const networks = await networkServices.get(id, userId);
  res.send(networks).status(200);
}

export async function remove(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  await networkServices.remove(id, userId);
  res.sendStatus(200);
}
