import type { NextApiRequest } from "next";
import type { NextApiRequestCookies } from "next/dist/server/api-utils";

export interface IAuthenticatedRequest extends NextApiRequest {
  cookies: NextApiRequestCookies;
  idportenToken: string;
}
