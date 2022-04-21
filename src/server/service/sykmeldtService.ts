import { get } from "@/common/api/axios/axios";
import {
  SykmeldtDTO,
  sykmeldtSchema,
} from "@/server/service/schema/sykmeldtSchema";
import serverEnv from "@/server/utils/serverEnv";

export function getSykmeldt(
  narmestelederid: string,
  accessToken: string
): Promise<SykmeldtDTO> {
  const url = `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/dinesykmeldte/${narmestelederid}`;

  return sykmeldtSchema.parseAsync(
    get(url, {
      accessToken,
    })
  );
}
