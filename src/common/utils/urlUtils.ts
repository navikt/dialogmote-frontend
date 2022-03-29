import {
  dineSykemeldteRoot,
  dittSykefravarRoot,
  loginServiceUrl,
} from "@/common/publicEnv";

export const loginUser = () => {
  if (!window) return;

  const isArbeidsgiver =
    window.location.href.indexOf("/dialogmoter/arbeidsgiver") > 0;
  window.location.href = `${loginServiceUrl}?redirect=${
    isArbeidsgiver ? dineSykemeldteRoot : dittSykefravarRoot
  }`;
};

export const loginTokenX = () => {
  if (!window) return;

  window.location.href = `/syk/dialogmoter/oauth2/login?redirect=${window.location.pathname}`;
};
