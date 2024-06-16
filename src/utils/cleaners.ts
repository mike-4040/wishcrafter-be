import { FrontError } from './errors.js';

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

/** Return property value if 'property' exists in 'unknownVar', undefined otherwise */
export function getProperty(
  unknownVar: unknown,
  property: string,
): unknown | undefined {
  if (!unknownVar || typeof unknownVar !== 'object') {
    return undefined;
  }

  return (unknownVar as Record<string, unknown>)[property];
}
