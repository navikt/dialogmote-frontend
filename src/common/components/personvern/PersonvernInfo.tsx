import { BodyLong, Link } from "@navikt/ds-react";
import { PERSONVERN_URL } from "../../constants/staticUrls";
import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";

const texts = {
  bottomText: "Vi bruker opplysningene også til å gjøre selve tjenesten bedre.",
  bottomUrl: "Les mer om hvordan NAV behandler personopplysninger.",
};

const PersonvernInfo = () => {
  const { trackEvent } = useAmplitude();

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
