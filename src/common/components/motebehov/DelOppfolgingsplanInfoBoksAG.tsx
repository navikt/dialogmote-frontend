import { BodyLong, Link, LocalAlert } from "@navikt/ds-react";
import { Events } from "@/common/analytics/events";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { useOppfolgingsplanUrlAG } from "@/common/hooks/useOppfolgingsplanUrlAG";

const texts = {
  alertstripe: "Husk å dele oppfølgingsplanen med Nav før møtet.",
  oppfolgingsplanlink: "Gå til oppfølgingsplanen.",
};

export const DelOppfolgingsplanInfoBoksAG = () => {
  const { trackEvent } = useAnalytics();
  const { data: dialogmoteData } = useDialogmoteDataAG();
  const oppfolgingsplanUrl = useOppfolgingsplanUrlAG(
    dialogmoteData?.sykmeldt?.fnr,
  );

  return (
    <LocalAlert status="announcement">
      <LocalAlert.Content>
        <BodyLong>{texts.alertstripe}</BodyLong>
        <Link
          href={oppfolgingsplanUrl}
          onClick={() => trackEvent(Events.Oppfolgingsplan)}
        >
          {texts.oppfolgingsplanlink}
        </Link>
      </LocalAlert.Content>
    </LocalAlert>
  );
};
