import { BodyShort } from "@navikt/ds-react";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";

const texts = {
  kontaktOssText: "Du kan også ",
  kontaktOssLink: "kontakte oss.",
};

const KontaktOssVeileder = () => {
  return (
    <VeilederGuidePanel>
      <BodyShort className="mt-4">
        {texts.kontaktOssText}{" "}
        <KontaktOssLink linkText={texts.kontaktOssLink} />
      </BodyShort>
    </VeilederGuidePanel>
  );
};

export default KontaktOssVeileder;
