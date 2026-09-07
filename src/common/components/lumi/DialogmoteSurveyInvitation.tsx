import { LumiSurveyDock, type LumiSurveyTransport } from "@navikt/lumi-survey";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { get } from "@/common/api/fetch";
import {
  dialogmoteSurvey,
  dialogmoteSurveyId,
  dialogmoteSurveyRevision,
} from "./dialogmoteSurvey";

export function createSurveyTransport(basePath: string): LumiSurveyTransport {
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
  const { data } = useQuery({
    queryKey: ["dialogmote-survey-config"],
    queryFn: () => get<{ enabled: boolean }>(`${basePath}/api/lumi/config`),
    staleTime: 60_000,
    retry: false,
  });
  const transport = useMemo(() => createSurveyTransport(basePath), [basePath]);

  // An optional survey must not interrupt the user's task if configuration fails.
  if (data?.enabled !== true) return null;

  return (
    <LumiSurveyDock
      surveyId={dialogmoteSurveyId}
      survey={dialogmoteSurvey}
      transport={transport}
      context={{
        tags: {
          role: "employer",
          page: "dialogmoter",
          revision: String(dialogmoteSurveyRevision),
        },
      }}
      behavior={{
        initialOpen: false,
        collectLocation: false,
        showProgress: true,
      }}
      labels={{ minimizedButton: "Del erfaringer med dialogmøte 1" }}
    />
  );
}
