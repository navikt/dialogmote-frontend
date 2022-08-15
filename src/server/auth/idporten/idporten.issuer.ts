import { Issuer } from "openid-client";
import serverEnv from "../../utils/serverEnv";

let _issuer: Issuer;

export const getIssuer = async () => {
  if (_issuer) return _issuer;
  _issuer = await Issuer.discover(serverEnv.IDPORTEN_WELL_KNOWN_URL);
  return _issuer;
};
