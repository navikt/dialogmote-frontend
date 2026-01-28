import { http, HttpResponse } from "msw";
import {
  createDialogmoteAG,
  createDialogmoteSM,
} from "./data/factories/dialogmote";

export const handlers = [
  http.post("*/api/*/brev/brev_uuid/lest", () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.post("*/api/sykmeldt/motebehov/ferdigstill", () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.get("*/api/sykmeldt", () => {
    return HttpResponse.json(createDialogmoteSM());
  }),
  http.get("*/api/arbeidsgiver/*", () => {
    return HttpResponse.json(createDialogmoteAG());
  }),
];
