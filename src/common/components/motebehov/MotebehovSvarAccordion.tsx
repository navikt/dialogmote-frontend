import { Accordion } from "@navikt/ds-react";
import MotebehovKvittering from "@/common/components/motebehov/MotebehovKvittering";
import React, { useState } from "react";
import { Motebehov } from "@/server/data/types/internal/MotebehovTypes";

const texts = {
  seSvaretDitt: "Se svaret ditt",
};

interface Props {
  motebehov: Motebehov;
}

export const MotebehovSvarAccordion = ({ motebehov }: Props) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  return (
    <Accordion>
      <Accordion.Item open={openAccordion}>
        <Accordion.Header onClick={() => setOpenAccordion(!openAccordion)}>
          {texts.seSvaretDitt}
        </Accordion.Header>
        <Accordion.Content>
          <MotebehovKvittering motebehov={motebehov} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
