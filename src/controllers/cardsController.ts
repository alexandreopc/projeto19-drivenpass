import { Request, Response } from "express";
import cardServices, { CreateCardData } from "../services/cardServices.js";

export async function create(req: Request, res: Response) {
  const body = req.body;
  const userId: number = res.locals.userId;
  const data: CreateCardData = { ...body, userId };
  // console.log(data);
  await cardServices.create(data);
  res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  const notes = await cardServices.getAll(userId);
  res.send(notes).status(200);
}

export async function get(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  const notes = await cardServices.get(id, userId);
  res.send(notes).status(200);
}

export async function remove(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  await cardServices.remove(id, userId);
  res.sendStatus(200);
}
