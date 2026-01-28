import { Chat2Icon } from "@navikt/aksel-icons";
import { LinkCard } from "@navikt/ds-react";
import NextLink from "next/link";
import type { MotebehovSkjemaType } from "types/shared/motebehov";
import { Events } from "@/common/analytics/events";
import CircledIcon from "@/common/components/icon/CircledIcon";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { useAnalytics } from "@/common/hooks/useAnalytics";

interface Props {
  skjemaType: MotebehovSkjemaType;
  children: string;
}

export const MotebehovSubmitButton = ({ skjemaType, children }: Props) => {
  const landingUrl = useLandingUrl();
  const { trackEvent } = useAnalytics();

  const path =
    skjemaType === "MELD_BEHOV"
      ? `${landingUrl}/motebehov/meld`
      : `${landingUrl}/motebehov/svar`;

  return (
    <LinkCard
      className="w-fit mb-4"
      style={{
        backgroundColor: "var(--ax-bg-info-soft)",
        borderColor: "var(--ax-border-neutral-subtle)",
      }}
    >
      <LinkCard.Icon>
        <CircledIcon icon={<Chat2Icon fontSize="1.5rem" />} />
      </LinkCard.Icon>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <NextLink
            href={path}
            onClick={() => {
              trackEvent(
                skjemaType === "MELD_BEHOV"
                  ? Events.MeldBehov
                  : Events.SvarBehov,
              );
            }}
          >
            {children}
          </NextLink>
        </LinkCard.Anchor>
      </LinkCard.Title>
    </LinkCard>
  );
};
