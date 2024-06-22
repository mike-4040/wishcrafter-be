import { SnakeCaseKeys } from '../type/objects.js';
import { camelCaseToSnakeCase } from './strings.js';

export function transformToSnakeCase<T extends Record<string, unknown>>(
  obj: T,
): SnakeCaseKeys<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const snakeCaseKey = camelCaseToSnakeCase(key);
    console.log({ key, snakeCaseKey, value });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (acc as any)[snakeCaseKey] = value;
    return acc;
  }, {} as SnakeCaseKeys<T>);
}
