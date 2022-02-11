import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { InfoUrl } from "@/server/data/types/internal/BrevTypes";
import { Alert, Heading, Link } from "@navikt/ds-react";

const texts = {
  title: "Du kan finne mer informasjon på nav.no:",
};

interface Props {
  infoUrls: InfoUrl[];
}

const UsefulLinks = ({ infoUrls = [] }: Props) => {
  const { trackEvent } = useAmplitude();

  if (infoUrls.length === 0) {
    return null;
  }

  return (
    <Alert variant="info" size="medium">
      <Heading spacing size="small" level="2">
        {texts.title}
      </Heading>
      <section>
        {infoUrls.map((infoUrl) => {
          return (
            <li key={infoUrl.key}>
              <Link
                href={infoUrl.url}
                onClick={() =>
                  trackEvent(Events.LenkeIReferat, { linkType: infoUrl.text })
                }
              >
                {infoUrl.text}
              </Link>
            </li>
          );
        })}
      </section>
    </Alert>
  );
};

export default UsefulLinks;
