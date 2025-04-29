import { FieldSnapshotComponent, FormSnapshotDto } from "@/types/shared/form";
import { FormSummary } from "@navikt/ds-react";

function ReceiptComponent({
  fieldSnapshot,
}: {
  fieldSnapshot: FieldSnapshotComponent;
}) {
  const { fieldType, fieldLabel } = fieldSnapshot;

  switch (fieldType) {
    case "TEXT":
      return (
        <FormSummary.Answer>
          <FormSummary.Label>{fieldLabel}</FormSummary.Label>
          <FormSummary.Value>{fieldSnapshot.value}</FormSummary.Value>
        </FormSummary.Answer>
      );
    case "CHECKBOX_SINGLE":
      return (
        <FormSummary.Answer>
          <FormSummary.Label>{fieldLabel}</FormSummary.Label>
          <FormSummary.Value>
            {fieldSnapshot.value ? "Ja" : "Nei"}
          </FormSummary.Value>
        </FormSummary.Answer>
      );
    case "RADIO_GROUP":
      return (
        <FormSummary.Answer>
          <FormSummary.Label>{fieldLabel}</FormSummary.Label>
          <FormSummary.Value>
            {fieldSnapshot.selectedOptionLabel}
          </FormSummary.Value>
        </FormSummary.Answer>
      );
  }
}

interface Props {
  fieldSnapshots: FormSnapshotDto["fieldSnapshots"];
}

function ReceiptRenderer({ fieldSnapshots }: Props) {
  return (
    <>
      <FormSummary>
        <FormSummary.Header>
          <FormSummary.Heading level="3">Svaret ditt</FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
          {fieldSnapshots.map((fieldSnapshot) => (
            <ReceiptComponent
              key={fieldSnapshot.fieldId}
              fieldSnapshot={fieldSnapshot}
            />
          ))}
        </FormSummary.Answers>
      </FormSummary>
    </>
  );
}

export default ReceiptRenderer;
