import { Events } from "@/common/amplitude/events";
import { infoUrls } from "@/common/constants/InfoUrls";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { DocumentComponentKey } from "@/server/data/types/external/BrevTypes";
import { Alert, Heading, Link } from "@navikt/ds-react";

const texts = {
  title: "Du kan finne mer informasjon på nav.no:",
};

const ListUrls = ({
  documentKeys,
}: {
  documentKeys: DocumentComponentKey[];
}) => {
  const { trackEvent } = useAmplitude();

  const infoUrler = documentKeys.filter(
    (key) => infoUrls.get(key) != undefined
  );

  if (infoUrler.length === 0) {
    return null;
  }

  return (
    <section>
      {infoUrler.map((key) => {
        const infoUrl = infoUrls.get(key);
        if (infoUrl) {
          return (
            <li key={key}>
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
        }
      })}
    </section>
  );
};

interface Props {
  documentKeys: DocumentComponentKey[];
}

const UsefulLinks = ({ documentKeys = [] }: Props) => {
  return (
    <Alert variant="info" size="medium">
      <Heading spacing size="small" level="2">
        {texts.title}
      </Heading>
      <ListUrls documentKeys={documentKeys} />
    </Alert>
  );
};

export default UsefulLinks;
