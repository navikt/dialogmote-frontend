import {
  ExtMotebehov,
  ExtMotebehovSkjemaType,
  ExtMotebehovStatus,
} from "@/server/data/types/external/ExternalMotebehovTypes";

export class MotebehovBuilder {
  private readonly motebehov: ExtMotebehovStatus;

  constructor() {
    this.motebehov = {
      visMotebehov: false,
    };
  }

  withSkjematype(skjemaType: ExtMotebehovSkjemaType): MotebehovBuilder {
    this.motebehov.skjemaType = skjemaType;
    return this;
  }

  withMotebehov(motebehov: ExtMotebehov): MotebehovBuilder {
    this.motebehov.motebehov = motebehov;
    return this;
  }

  withVisMotebehov(vis: boolean): MotebehovBuilder {
    this.motebehov.visMotebehov = vis;
    return this;
  }

  build(): ExtMotebehovStatus {
    return this.motebehov;
  }
}
