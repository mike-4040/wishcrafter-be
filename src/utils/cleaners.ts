import { UserError } from "./errors";

export function asString(value: any, context: string, isUserError: boolean): string {
  const ErrorClass = isUserError ? UserError : Error;
  if (value === undefined) {
    const message = `${context}-undefined`;
    throw new ErrorClass(message);
  }

  if (typeof value !== 'string') {
    const message = `${context}-not-string`;
    throw new ErrorClass(message);
  }

  return value;
}