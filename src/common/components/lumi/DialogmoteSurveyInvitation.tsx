import { LumiSurveyDock, type LumiSurveyTransport } from "@navikt/lumi-survey";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { post } from "@/common/api/fetch";
import { dialogmoteSurvey, dialogmoteSurveyId } from "./dialogmoteSurvey";

function createSurveyTransport(basePath: string): LumiSurveyTransport {
  return {
    async submit(submission) {
      await post<void>(
        `${basePath}/api/lumi/feedback`,
        submission.transportPayload,
      );
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
      behavior={{ showProgress: true }}
      labels={{ minimizedButton: "Del erfaringer med dialogmøte 1" }}
    />
  );
}
