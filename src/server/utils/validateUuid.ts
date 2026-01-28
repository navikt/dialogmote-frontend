const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

export const isValidUuid = (
  value: string | string[] | undefined,
): value is string => {
  if (typeof value !== "string") {
    return false;
  }
  return uuidRegex.test(value);
};
