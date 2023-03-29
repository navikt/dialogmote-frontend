import { Events } from "@/common/amplitude/events";
import React from "react";
import { LinkPanel } from "@navikt/ds-react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { MotebehovSkjemaType } from "types/shared/motebehov";
import NextLink from "next/link";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import styled from "styled-components";
import { Chat2Icon } from "@navikt/aksel-icons";
import CircledIcon from "@/common/components/icon/CircledIcon";

const ContainedLinkPanel = styled(LinkPanel)`
  width: fit-content;
  margin-bottom: 1rem;
  background: #f7f7f7;
`;

const IconAndTextWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`;

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
      <ContainedLinkPanel
        forwardedAs="div"
        border
        onClick={() => {
          trackEvent(
            skjemaType === "MELD_BEHOV" ? Events.MeldBehov : Events.SvarBehov
          );
        }}
      >
        <IconAndTextWrapper>
          <CircledIcon icon={<Chat2Icon fontSize="1.5rem" />} />
          <LinkPanel.Title>{children}</LinkPanel.Title>
        </IconAndTextWrapper>
      </ContainedLinkPanel>
    </NextLink>
  );
};
