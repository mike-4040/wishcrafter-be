import { SnakeCaseString } from './strings.js';

/**
 * Utility type converts object type to new object types with
 * the top-level keys of an object from camelCase to snake_case
 */
export type SnakeCaseKeys<T> = {
  [K in keyof T as K extends string ? SnakeCaseString<K> : never]: T[K];
};
