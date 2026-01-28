import { get } from "@/common/api/fetch/fetch";
import { sykmeldtSchema } from "@/server/service/schema/sykmeldtSchema";
import serverEnv from "@/server/utils/serverEnv";

export async function getSykmeldt(
  narmestelederid: string,
  accessToken: string
) {
  const url = `${serverEnv.DINESYKMELDTE_BACKEND_HOST}/api/v2/dinesykmeldte/${narmestelederid}`;

  return sykmeldtSchema.safeParse(
    await get(url, {
      accessToken,
    })
  );
}
