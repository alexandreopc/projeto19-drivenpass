import { NextFunction, Request, Response } from "express";

export default function errorMiddleware(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.type) return res.sendStatus(errorTypeToStatusCode(err.type));

  return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType: string) {
  if (errorType === "unauthorized") return 401;
  if (errorType === "not_found") return 404;
  if (errorType === "conflict") return 409;

  return 400;
}
