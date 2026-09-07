/** Runtime switch: changing the NAIS environment does not require a new build. */
export function isDialogmoteSurveyEnabled(): boolean {
  return process.env.LUMI_SURVEY_ENABLED === "true";
}
