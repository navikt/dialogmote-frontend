import React, { ReactElement, ReactNode } from "react";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import styled from "styled-components";
import Lenke from "nav-frontend-lenker";
import { Tilbakeknapp } from "nav-frontend-ikonknapper";
import { useRouter } from "next/router";
import { PERSONVERN_URL } from "@/common/constants/staticPaths";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 32px;
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  max-width: 640px;
`;

const HeaderStyled = styled.header`
  margin: 32px 0;
  text-align: center;
`;

const TilbakeknappStyled = styled(Tilbakeknapp)`
  width: 108px;
  margin-bottom: 32px;
`;

const BottomInfoStyled = styled.section`
  text-align: center;
  margin-top: auto;
`;

const texts = {
  bottomText: "Vi bruker opplysningene også til å gjøre selve tjenesten bedre.",
  bottomUrl: "Les mer om hvordan NAV behandler personopplysninger.",
};

interface Props {
  title: string;
  children: ReactNode;
  displayTilbakeknapp?: boolean;
}

const DialogmoteContainer = ({
  title,
  displayTilbakeknapp = false,
  children,
}: Props): ReactElement => {
  const router = useRouter();

  return (
    <WrapperStyled>
      <ContentStyled>
        <HeaderStyled>
          <Sidetittel>{title}</Sidetittel>
        </HeaderStyled>
        {children}
        {displayTilbakeknapp && (
          <TilbakeknappStyled onClick={() => router.back()} />
        )}
        <BottomInfoStyled>
          <Normaltekst>{texts.bottomText}</Normaltekst>
          <Lenke href={PERSONVERN_URL}>{texts.bottomUrl}</Lenke>
        </BottomInfoStyled>
      </ContentStyled>
    </WrapperStyled>
  );
};

export default DialogmoteContainer;
