import {
  Motebehov,
  MotebehovSkjemaType,
  MotebehovStatus,
} from "@/server/data/types/external/MotebehovTypes";

export class MotebehovBuilder {
  private readonly motebehov: MotebehovStatus;

  constructor() {
    this.motebehov = {
      visMotebehov: false,
    };
  }

  withSkjematype(skjemaType: MotebehovSkjemaType): MotebehovBuilder {
    this.motebehov.skjemaType = skjemaType;
    return this;
  }

  withMotebehov(motebehov: Motebehov): MotebehovBuilder {
    this.motebehov.motebehov = motebehov;
    return this;
  }

  withVisMotebehov(vis: boolean): MotebehovBuilder {
    this.motebehov.visMotebehov = vis;
    return this;
  }

  build(): MotebehovStatus {
    return this.motebehov;
  }
}
