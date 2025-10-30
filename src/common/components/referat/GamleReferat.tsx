import { Events } from "@/common/analytics/events";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { useReferatPath } from "@/common/hooks/routeHooks";
import { getLongDateFormat } from "@/common/utils/dateUtils";
import React from "react";
import { Referat } from "types/shared/brev";

const linkText = (moteDato: string) => {
  return `Referat fra møte ${moteDato}`;
};

const endretDatoText = (endretDato: string) => {
  return ` - Endret ${getLongDateFormat(endretDato)}`;
};

interface Props {
  referater: Referat[];
}

const GamleReferat = ({ referater }: Props) => {
  const referatPath = useReferatPath();

  if (referater.length > 0) {
    return (
      <ul>
        {referater.map((referat) => {
          const formattedDate = getLongDateFormat(referat.tid);
          const href = `${referatPath}/${referat.uuid}`;

          return (
            <li key={referat.tid}>
              <RouterLenke href={href} trackingName={Events.TidligereReferat}>
                {linkText(formattedDate)}
                {referat.endring && endretDatoText(referat.createdAt)}
              </RouterLenke>
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};

export default GamleReferat;
