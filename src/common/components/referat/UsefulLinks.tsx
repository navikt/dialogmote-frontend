import { Events } from "@/common/amplitude/events";
import { infoUrls } from "@/common/constants/InfoUrls";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Alert, Heading, Link } from "@navikt/ds-react";

const texts = {
  title: "Du kan finne mer informasjon på nav.no:",
};

const ListUrls = ({ documentKeys }: { documentKeys: string[] }) => {
  const { trackEvent } = useAmplitude();
  const infoKeys = Object.keys(infoUrls);
  const validDocumentKeys = documentKeys.filter((key) =>
    infoKeys.includes(key)
  );

  if (validDocumentKeys.length === 0) {
    return null;
  }

  return (
    <section>
      {validDocumentKeys.map((key) => {
        const { text, url } = infoUrls[key];

        return (
          <li key={key}>
            <Link
              href={url}
              onClick={() =>
                trackEvent(Events.LenkeIReferat, { linkType: text })
              }
            >
              {text}
            </Link>
          </li>
        );
      })}
    </section>
  );
};

interface Props {
  documentKeys: string[];
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
