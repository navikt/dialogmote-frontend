import { boolean, object, string, type z } from "zod";

export const personSchema = object({
  navn: string(),
  fnr: string(),
  pilotUser: boolean(),
});

export type PersonDTO = z.infer<typeof personSchema>;
