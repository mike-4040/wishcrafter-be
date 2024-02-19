import { NextFunction, Request, Response } from "express"

export class UserError extends Error {
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('errorHandler', err);

  if (err instanceof UserError) {
    res.status(400).send({ success: false, errMessage: err.message });
    return;
  }

  res.status(500).send({ success: false, errMessage: 'Internal Server Error' });
}