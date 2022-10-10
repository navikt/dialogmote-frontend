import { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";

export const createSykmeldt = (sykmeldt?: Partial<SykmeldtDTO>) => ({
  narmestelederId: "123",
  orgnummer: "000111222",
  fnr: "01010112345",
  navn: "Kreativ Hatt",
  aktivSykmelding: true,
  ...sykmeldt,
});
