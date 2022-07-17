import { NextFunction, Request, Response } from "express";
import authRepository from "../repositories/authRepository.js";
import authServices from "../services/authServices.js";

export default async function tokenValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization ? authorization.replace("Bearer ", "") : null;

  if (!token) {
    return res.status(401).send("token not provided");
  }

  const session = await authRepository.getUserIdByToken(token);
  if (!session) {
    return res.status(401).send("invalid token");
  }
  const user = await authRepository.getUserEmailById(session.userId);

  const validatedtoken = await authServices.createToken(
    session.userId,
    user.email
  );

  res.locals.userId = session.userId;
  res.locals.email = user.email;

  next();
}
