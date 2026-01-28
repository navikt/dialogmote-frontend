const narmestelederIdRegex = /^[a-zA-Z0-9_-]{1,100}$/;

export const isValidNarmestelederId = (
  value: string | string[] | undefined,
): value is string => {
  if (typeof value !== "string") {
    return false;
  }
  return narmestelederIdRegex.test(value);
};
