import { get } from "@/common/api/axios/axios";
import { array } from "zod";
import serverEnv from "../utils/serverEnv";
import { BrevDTO, brevSchema } from "./schema/brevSchema";

export function getBrevAG(
  accessToken: string,
  personIdent: string
): Promise<BrevDTO[]> {
  return array(brevSchema).parseAsync(
    get(`${serverEnv.ISDIALOGMOTE_HOST}/api/v1/narmesteleder/brev`, {
      accessToken,
      personIdent,
    })
  );
}

export function getBrevSM(accessToken: string) {
  return array(brevSchema).parseAsync(
    get(`${serverEnv.ISDIALOGMOTE_HOST}/api/v1/arbeidstaker/brev`, {
      accessToken,
    })
  );
}
