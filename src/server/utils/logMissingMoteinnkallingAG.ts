import type { Logger } from "pino";
import type { DialogmoteData } from "@/types/shared/dialogmote";
import type { BrevDTO } from "@/server/service/schema/brevSchema";

let _teamLogger: Logger | null = null;
async function getTeamLogger(): Promise<Logger> {
  if (!_teamLogger) {
    const mod = await import("@navikt/next-logger/team-log");
    _teamLogger = mod.teamLogger;
  }
  return _teamLogger;
}

/**
 * Temporary debug logging (team-logs only) for when AG visits the
 * dialogmote page but gets no moteinnkalling shown (only a video).
 *
 * Logs brevArray from isdialogmote (types, dates, svar) and a summary
 * of the mapped DialogmoteData so we can correlate what the backend
 * returned with what the frontend decided to show.
 *
 * Should be removed once the root cause is identified.
 */
export async function logMissingMoteinnkallingAG({
  narmestelederid,
  sykmeldtFnr,
  brevArray,
  dialogmoteData,
}: {
  narmestelederid: string;
  sykmeldtFnr: string;
  brevArray: BrevDTO[];
  dialogmoteData: DialogmoteData;
}): Promise<void> {
  if (dialogmoteData.moteinnkalling) return;

  const hasInnkallingOrNyttTidSted = brevArray.some(
    (b) => b.brevType === "INNKALT" || b.brevType === "NYTT_TID_STED",
  );
  const latestBrevType = brevArray.length > 0 ? brevArray[0]?.brevType : null;
  const reason =
    brevArray.length === 0
      ? "emptyBrevArray"
      : hasInnkallingOrNyttTidSted
        ? "innkallingOvershadowedByReferat"
        : "noActiveInnkalling";

  try {
    const tl = await getTeamLogger();
    tl.warn(
      {
        reason,
        narmestelederid,
        sykmeldtFnr,
        brevArray: brevArray.map((b) => ({
          brevType: b.brevType,
          createdAt: b.createdAt,
          lestDato: b.lestDato,
          svarType: b.svar?.svarType ?? null,
        })),
        dialogmoteData: {
          hasMoteinnkalling: false,
          latestBrevType,
          referaterCount: dialogmoteData.referater.length,
          hasMotebehov: !!dialogmoteData.motebehov,
          aktivSykmelding: dialogmoteData.sykmeldt?.aktivSykmelding ?? null,
        },
      },
      "AG visited dialogmote page but moteinnkalling is undefined — no form shown",
    );
  } catch {
    /* Debug logging must never block the response */
  }
}
