import { Request, Response } from "express";
import authService, { CreateUserData } from "../services/authServices.js";

export async function signup(req: Request, res: Response) {
  const body: CreateUserData = req.body;

  await authService.register(body);
  res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
  const body: CreateUserData = req.body;

  const token = await authService.login(body);
  res.send(token).status(200);
}
