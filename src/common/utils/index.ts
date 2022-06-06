export const getRandomVariantBasedOnDate = (date: string) =>
  (new Date(date).getTime() ?? 0) % 2 === 1;
