import { SnakeCaseString } from '../type/strings.js';

/**
 * Converts a camelCase string to snake_case.
 *
 */
export function camelCaseToSnakeCase<T extends string>(
  str: T,
): SnakeCaseString<T> {
  return str.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  ) as SnakeCaseString<T>;
}
