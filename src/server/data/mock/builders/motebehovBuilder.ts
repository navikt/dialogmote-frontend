import {
  MotebehovDataDTO,
  MotebehovStatusDTO,
  MotebehovSkjemaTypeDTO,
} from "@/server/service/schema/motebehovSchema";

export class MotebehovBuilder {
  private readonly motebehov: MotebehovStatusDTO;

  constructor() {
    this.motebehov = {
      visMotebehov: false,
      skjemaType: "MELD_BEHOV",
      motebehovWithFormValues: null,
    };
  }

  withSkjematype(skjemaType: MotebehovSkjemaTypeDTO): MotebehovBuilder {
    this.motebehov.skjemaType = skjemaType;
    return this;
  }

  withMotebehov(motebehov: MotebehovDataDTO): MotebehovBuilder {
    this.motebehov.motebehovWithFormValues = motebehov;
    return this;
  }

  withVisMotebehov(vis: boolean): MotebehovBuilder {
    this.motebehov.visMotebehov = vis;
    return this;
  }

  build(): MotebehovStatusDTO {
    return this.motebehov;
  }
}
