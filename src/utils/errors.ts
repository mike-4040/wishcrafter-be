import { ZodError } from 'zod';
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
    console.error('errorHandler-UserError: ', err.message);
    res.status(400).send(err.message);
    return;
  }

  if (err instanceof FrontError) {
    console.error('errorHandler-frontError: ', err);
    res.status(400).send(err.message);
    return;
  }

  if (err instanceof ZodError) {
    console.error('errorHandler-ZodError: ', err.errors);
    res.status(400).send(err.errors);
    return;
  }

  console.dir(err, { depth: null });

  res.status(500).send('Internal Server Error');
}
