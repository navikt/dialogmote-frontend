import { BodyLong, Link } from "@navikt/ds-react";
import { Events } from "@/common/analytics/events";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { PERSONVERN_URL } from "../../constants/staticUrls";

const texts = {
  bottomText: "Vi bruker opplysningene også til å gjøre selve tjenesten bedre.",
  bottomUrl: "Les mer om hvordan Nav behandler personopplysninger.",
};

const PersonvernInfo = () => {
  const { trackEvent } = useAnalytics();

  return (
    <section className="flex items-center flex-col mt-auto text-center mb-8">
      <BodyLong>{texts.bottomText}</BodyLong>
      <Link
        href={PERSONVERN_URL}
        onClick={() => trackEvent(Events.BehandlePersonopplysninger)}
      >
        {texts.bottomUrl}
      </Link>
    </section>
  );
};

export default PersonvernInfo;
