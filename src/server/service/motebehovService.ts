import { get } from "@/common/api/fetch/fetch";

import serverEnv from "@/server/utils/serverEnv";
import { motebehovStatusSchema } from "./schema/motebehovSchema";

export async function getMotebehovAG(
  accessToken: string,
  fnr: string,
  orgnummer: string
) {
  const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/motebehov?fnr=${fnr}&virksomhetsnummer=${orgnummer}`;

  const motebehovStatus = await get(url, {
    accessToken,
  });

  return motebehovStatusSchema.safeParse(motebehovStatus);
}

export async function getMotebehovSM(accessToken: string) {
  const motebehovStatus = await get(
    `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v4/arbeidstaker/motebehov`,
    {
      accessToken,
    }
  );

  return motebehovStatusSchema.safeParse(motebehovStatus);
}
