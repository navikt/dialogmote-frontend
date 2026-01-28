import { Events } from "@/common/analytics/events";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { Heading, Link, LocalAlert } from "@navikt/ds-react";
import { InfoUrl } from "types/client/infoUrl";
import { Referat } from "types/shared/brev";

const texts = {
  title: "Du kan finne mer informasjon på nav.no:",
};

interface Props {
  referat: Referat;
}

const UsefulLinks = ({ referat }: Props) => {
  const { trackEvent } = useAnalytics();

  const infoUrls = referat.document
    .map((documentComponent) => documentComponent.infoUrl)
    .filter((infoUrl): infoUrl is InfoUrl => !!infoUrl);

  if (infoUrls.length === 0) {
    return null;
  }

  return (
    <LocalAlert className="mb-8" status="info" size="medium">
      <LocalAlert.Content>
        <Heading spacing size="small" level="2">
          {texts.title}
        </Heading>
        <ul>
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
        </ul>
      </LocalAlert.Content>
    </LocalAlert>
  );
};

export default UsefulLinks;
