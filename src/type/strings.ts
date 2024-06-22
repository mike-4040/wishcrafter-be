/**
 * Utility type converts camelCase string to snake_case
 */
export type SnakeCaseString<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? `${First extends Uppercase<First> ? '_' : ''}${Lowercase<First>}${SnakeCaseString<Rest>}`
    : S;
