export function getUserTypeContext(pathname: string) {
  return pathname.includes("arbeidsgiver") ? "arbeidsgiver" : "privatperson";
}

export function createBreadcrumbs(pathname: string) {
  return pathname.includes("arbeidsgiver") ? "arbeidsgiver" : "privatperson";
}
