import { Events } from "@/common/amplitude/events";
import React from "react";
import { LinkPanel } from "@navikt/ds-react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { MotebehovSkjemaType } from "types/shared/motebehov";
import NextLink from "next/link";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { Chat2Icon } from "@navikt/aksel-icons";
import CircledIcon from "@/common/components/icon/CircledIcon";

interface Props {
  skjemaType: MotebehovSkjemaType;
  children: string;
}

export const MotebehovSubmitButton = ({ skjemaType, children }: Props) => {
  const landingUrl = useLandingUrl();
  const { trackEvent } = useAmplitude();

  const path =
    skjemaType === "MELD_BEHOV"
      ? `${landingUrl}/motebehov/meld`
      : `${landingUrl}/motebehov/svar`;

  return (
    <NextLink href={path} passHref>
      <LinkPanel
        as="div"
        className="w-fit mb-4 bg-ds-gray-50"
        border
        onClick={() => {
          trackEvent(
            skjemaType === "MELD_BEHOV" ? Events.MeldBehov : Events.SvarBehov
          );
        }}
      >
        <div className="inline-flex items-center gap-4">
          <CircledIcon icon={<Chat2Icon fontSize="1.5rem" />} />
          <LinkPanel.Title>{children}</LinkPanel.Title>
        </div>
      </LinkPanel>
    </NextLink>
  );
};
