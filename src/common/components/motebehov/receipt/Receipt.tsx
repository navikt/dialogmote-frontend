import { BodyShort } from "@navikt/ds-react";
import { getFullDateFormat } from "@/common/utils/dateUtils";
import React from "react";
import { Motebehov } from "@/types/shared/motebehov";
import ReceiptRenderer from "@/common/components/motebehov/receipt/ReceiptRenderer";
import { svarMotebehovSMOutputFixture } from "../../../../mocks/data/fixtures/form";

interface Props {
  motebehov: Motebehov;
}

function Receipt({ motebehov }: Props) {
  const fieldSnapshots = svarMotebehovSMOutputFixture;

  return (
    <>
      {motebehov.svar?.opprettetDato && (
        <BodyShort spacing>
          Sendt: {getFullDateFormat(motebehov.svar?.opprettetDato)}
        </BodyShort>
      )}

      <ReceiptRenderer fieldSnapshots={fieldSnapshots} />
    </>
  );
}

export default Receipt;
