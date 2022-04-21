import { boolean, infer, object, string } from "zod";

export const sykmeldtSchema = object({
  narmestelederId: string(),
  orgnummer: string(),
  fnr: string(),
  navn: string().optional(),
  aktivSykmelding: boolean().optional(),
});
export interface SykmeldtDTO extends infer<typeof sykmeldtSchema> {}
