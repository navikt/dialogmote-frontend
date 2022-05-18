import { get } from "@/common/api/axios/axios";

import serverEnv from "@/server/utils/serverEnv";
import { motebehovSchema } from "./schema/motebehovSchema";

export async function getMotebehovAG(
  fnr: string,
  orgnummer: string,
  accessToken: string
) {
  const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v2/motebehov?fnr=${fnr}&virksomhetsnummer=${orgnummer}`;

  return motebehovSchema.safeParse(
    await get(url, {
      accessToken,
    })
  );
}

export async function getMotebehovSM(accessToken: string) {
  return motebehovSchema.safeParse(
    await get(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v2/arbeidstaker/motebehov`,
      {
        accessToken,
      }
    )
  );
}
