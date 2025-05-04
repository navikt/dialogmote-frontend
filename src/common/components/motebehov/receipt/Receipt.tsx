import React from "react";
import { BodyShort } from "@navikt/ds-react";

import { getFullDateFormat } from "@/common/utils/dateUtils";
import ReceiptRenderer from "@/common/components/motebehov/receipt/ReceiptRenderer";
import { FormSnapshotOutputDto } from "@/server/service/schema/formSnapshotSchema";

interface Props {
  opprettetDato: string;
  formSnapshot: FormSnapshotOutputDto;
}

function Receipt({ opprettetDato, formSnapshot }: Props) {
  const fieldSnapshots = formSnapshot.fieldSnapshots;

  return (
    <>
      <BodyShort spacing>Sendt: {getFullDateFormat(opprettetDato)}</BodyShort>

      <ReceiptRenderer fieldSnapshots={fieldSnapshots} />
    </>
  );
}

export default Receipt;
