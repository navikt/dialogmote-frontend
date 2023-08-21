import { PersonIcon } from "@navikt/aksel-icons";
import { addSpaceAfterEverySixthCharacter } from "@/common/utils/stringUtils";
import { DialogmoteData } from "../../types/shared/dialogmote";

export const getAgSideMenuHeader = (dialogmoteData?: DialogmoteData) => {
  if (!!dialogmoteData?.sykmeldt?.navn && !!dialogmoteData?.sykmeldt?.fnr) {
    return {
      title: dialogmoteData?.sykmeldt?.navn,
      subtitle: `Fødselsnr: ${addSpaceAfterEverySixthCharacter(
        dialogmoteData?.sykmeldt?.fnr
      )}`,
      Icon: PersonIcon,
    };
  }

  return false;
};

export const getSykmeldt = (dialogmoteData?: DialogmoteData) => {
  return {
    navn: dialogmoteData?.sykmeldt?.navn ?? "",
    fnr: dialogmoteData?.sykmeldt?.fnr ?? "",
  };
};
