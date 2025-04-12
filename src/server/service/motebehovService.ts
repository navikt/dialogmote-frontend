import { get } from "@/common/api/axios/axios";

import serverEnv from "@/server/utils/serverEnv";
import { motebehovStatusSchema } from "./schema/motebehovSchema";

export async function getMotebehovAG(
  accessToken: string,
  fnr: string,
  orgnummer: string
) {
  const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/motebehov?fnr=${fnr}&virksomhetsnummer=${orgnummer}`;

  return motebehovStatusSchema.safeParse(
    await get(url, "getMotebehovAGException", {
      accessToken,
    })
  );
}

export async function getMotebehovSM(accessToken: string) {
  return motebehovStatusSchema.safeParse(
    await get(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov/all`,
      "getMotebehovSMException",
      {
        accessToken,
      }
    )
  );
}
