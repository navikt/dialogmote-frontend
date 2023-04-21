import { rest } from "msw";
export const handlers = [
  rest.post("/api/arbeidsgiver/brev/brev_uuid/lest", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
