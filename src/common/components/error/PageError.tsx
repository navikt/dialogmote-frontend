import { useRouter } from "next/router";
import styled from "styled-components";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { texts } from "@/common/components/error/texts";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { Events } from "@/common/amplitude/events";

export const PageError = ({ text, details }: Props): JSX.Element => {
  const landingUrl = useLandingUrl();
  const router = useRouter();

  const PaddedSpan = styled.span`
    margin-right: 4px;
  `;

  return (
    <div>
      <Heading spacing size="large" level="1">
        {texts.pageError.title}
      </Heading>
      <Heading spacing size="small" level="2">
        {text ?? texts.pageError.defaultErrorMsg}
      </Heading>
      <BodyLong spacing>
        <PaddedSpan>{texts.pageError.reloadPageMsgOne}</PaddedSpan>
        <Link role="button" onClick={() => router.reload()}>
          <PaddedSpan>{texts.pageError.reloadPageMsgTwo}</PaddedSpan>
        </Link>
        {details ?? texts.pageError.defaultDetails}
      </BodyLong>
      <RouterLenke href={landingUrl} trackingName={Events.ErrorWithEscapeRoute}>
        {texts.pageError.backToLandingPage}
      </RouterLenke>
    </div>
  );
};

interface Props {
  text?: string;
  details?: string;
}
