export const addSpaceAfterEverySixthCharacter = (value: string): string => {
  return value.replace(/(.{6})/g, "$1 ");
};
