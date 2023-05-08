export function notNullish<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function rightNotNullish<Left, Right>(
  tuple: [Left, Right | null | undefined]
): tuple is [Left, Right] {
  return notNullish(tuple[1]);
}
