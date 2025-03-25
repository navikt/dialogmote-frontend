import { rest } from "msw";
import {
  createDialogmoteAG,
  createDialogmoteSM,
} from "./data/factories/dialogmote";

export const handlers = [
  rest.post("/api/*/brev/brev_uuid/lest", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/api/sykmeldt/motebehov/ferdigstill", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/sykmeldt", (req, res, ctx) => {
    return res(ctx.json(createDialogmoteSM()));
  }),
  rest.get("/api/arbeidsgiver/*", (req, res, ctx) => {
    return res(ctx.json(createDialogmoteAG()));
  }),
];
