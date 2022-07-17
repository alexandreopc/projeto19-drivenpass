import { Request, Response } from "express";
import notesServices, { CreateNoteData } from "../services/noteServices.js";

export async function create(req: Request, res: Response) {
  const body = req.body;
  const userId: number = res.locals.userId;
  const data = { ...body, userId };

  await notesServices.create(data);
  res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  const notes = await notesServices.getAll(userId);
  res.send(notes).status(200);
}

export async function get(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  const notes = await notesServices.get(id, userId);
  res.send(notes).status(200);
}

export async function remove(req: Request, res: Response) {
  const id: number = +req.params.id;
  const userId: number = res.locals.userId;

  await notesServices.remove(id, userId);
  res.sendStatus(200);
}
