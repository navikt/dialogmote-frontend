export function getRandomVariantBasedOnDate(date?: string) {
  if (!date) return false;

  return (new Date(date).getTime() ?? 0) % 2 !== 1;
}
