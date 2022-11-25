import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import { BodyShort } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";

const texts = {
  kontaktOssText: "Du kan også ",
  kontaktOssLink: "kontakte oss.",
};

const SpacedBodyShort = styled(BodyShort)`
  margin-top: 1rem;
`;

const KontaktOssVeileder = () => {
  return (
    <VeilederGuidePanel>
      <SpacedBodyShort>
        {texts.kontaktOssText}{" "}
        <KontaktOssLink linkText={texts.kontaktOssLink} />
      </SpacedBodyShort>
    </VeilederGuidePanel>
  );
};

export default KontaktOssVeileder;
