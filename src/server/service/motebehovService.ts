import { get } from "@/common/api/axios/axios";

import serverEnv from "@/server/utils/serverEnv";
import { MotebehovDTO, motebehovSchema } from "./schema/motebehovSchema";

export function getMotebehovAG(
  fnr: string,
  orgnummer: string,
  accessToken: string
): Promise<MotebehovDTO> {
  const url = `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v2/motebehov?fnr=${fnr}&virksomhetsnummer=${orgnummer}`;

  return motebehovSchema.parseAsync(
    get(url, {
      accessToken,
    })
  );
}

export function getMotebehovSM(accessToken: string): Promise<MotebehovDTO> {
  return motebehovSchema.parseAsync(
    get(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v2/arbeidstaker/motebehov`,
      {
        accessToken,
      }
    )
  );
}
