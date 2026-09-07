import { LumiSurveyDock, type LumiSurveyTransport } from "@navikt/lumi-survey";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { dialogmoteSurvey, dialogmoteSurveyId } from "./dialogmoteSurvey";

function createSurveyTransport(basePath: string): LumiSurveyTransport {
  return {
    async submit(submission) {
      const response = await fetch(`${basePath}/api/lumi/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission.transportPayload),
      });
      if (!response.ok) {
        throw new Error(
          `Tilbakemeldingen kunne ikke sendes (${response.status}).`,
        );
      }
    },
  };
}

/** Only mounted after the employer overview has loaded successfully. */
export function DialogmoteSurvey() {
  const { basePath } = useRouter();
  const transport = useMemo(() => createSurveyTransport(basePath), [basePath]);

  return (
    <LumiSurveyDock
      surveyId={dialogmoteSurveyId}
      survey={dialogmoteSurvey}
      transport={transport}
      behavior={{
        initialOpen: false,
        collectLocation: false,
        showProgress: true,
      }}
      labels={{ minimizedButton: "Del erfaringer med dialogmøte 1" }}
    />
  );
}
