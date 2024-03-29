import { NextFunction, Request, Response } from 'express';

/**
 * Error caused by user input, such as invalid email or password
 * - surface to the user
 * - logging only message
 */
export class UserError extends Error {}

/**
 * Error caused by front-end code
 *  - surface to the user
 *  - logging message and stack trace
 */
export class FrontError extends Error {}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof UserError) {
    console.error(err.message);
    res.status(400).send({ success: false, message: err.message });
    return;
  }

  if (err instanceof FrontError) {
    console.error(err);
    res.status(400).send({ success: false, message: err.message });
    return;
  }

  console.error('errorHandler: ', err);

  res.status(500).send({ success: false, message: 'Internal Server Error' });
}
