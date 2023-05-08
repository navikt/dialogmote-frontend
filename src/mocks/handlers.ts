import { rest } from "msw";
import { createDialogmote } from "./data/factories/dialogmote";
export const handlers = [
  rest.post("/api/*/brev/brev_uuid/lest", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/sykmeldt", (req, res, ctx) => {
    return res(ctx.json(createDialogmote()));
  }),
  rest.post("/api/motebehov", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
