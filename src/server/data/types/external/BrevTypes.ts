export type SvarType = "KOMMER" | "NYTT_TID_STED" | "KOMMER_IKKE";

export type SvarRespons = {
  svarType: SvarType;
  svarTekst?: string;
};
