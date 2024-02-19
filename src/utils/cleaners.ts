import { FrontError } from '.';

export function asString(value: unknown, context: string): string {
  if (value === undefined) {
    const message = `${context}Missing`;
    throw new FrontError(message);
  }

  if (typeof value !== 'string') {
    const message = `${context}NotString`;
    throw new FrontError(message);
  }

  return value;
}
