import {
  dineSykemeldteRoot,
  dittSykefravarRoot,
  loginServiceUrl,
} from "@/common/publicEnv";

export const loginUser = () => {
  if (typeof window === "undefined") return;

  const isArbeidsgiver =
    window.location.href.indexOf("/dialogmoter/arbeidsgiver") > 0;
  window.location.href = `${loginServiceUrl}?redirect=${
    isArbeidsgiver ? dineSykemeldteRoot : dittSykefravarRoot
  }`;
};
