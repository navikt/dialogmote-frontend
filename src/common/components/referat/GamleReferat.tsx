import { Events } from "@/common/amplitude/events";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { useReferatPath } from "@/common/hooks/routeHooks";
import { getLongDateFormat } from "@/common/utils/dateUtils";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import React from "react";

const linkText = (date: string) => {
  return `Referat fra ${date}`;
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
