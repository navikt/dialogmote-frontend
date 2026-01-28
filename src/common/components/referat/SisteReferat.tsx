import { Events } from "@/common/analytics/events";
import { useReferatPath } from "@/common/hooks/routeHooks";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { getLongDateFormat } from "@/common/utils/dateUtils";
import { LinkCard } from "@navikt/ds-react";
import NextLink from "next/link";
import { Referat } from "types/shared/brev";

const texts = {
  text: "Referatet oppsummerer det vi snakket om i dialogmøtet",
};

interface Props {
  referat: Referat;
}

const endretDatoText = (endretDato: string) => {
  return ` - Endret ${getLongDateFormat(endretDato)}`;
};

const SisteReferat = ({ referat }: Props) => {
  const { trackEvent } = useAnalytics();

  const referatPath = useReferatPath();
  const href = `${referatPath}/${referat.uuid}`;

  return (
    <LinkCard>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <NextLink
            href={href}
            onClick={() => trackEvent(Events.AktivtReferat)}
          >
            Referat fra møte {getLongDateFormat(referat.tid)}
            {referat.endring && endretDatoText(referat.createdAt)}
          </NextLink>
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>{texts.text}</LinkCard.Description>
    </LinkCard>
  );
};

export default SisteReferat;
