import { Events } from "@/common/amplitude/events";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { useRouteBasePath } from "@/common/hooks/routeHooks";
import { getLongDateFormat } from "@/common/utils/dateUtils";
import React from "react";
import { Referat } from "@/server/data/types/internal/BrevTypes";

const linkText = (date: string) => {
  return `Referat fra ${date}`;
};

interface Props {
  referater: Referat[];
}

const GamleReferat = ({ referater }: Props) => {
  const routeBasePath = useRouteBasePath();

  if (referater.length > 0) {
    return (
      <ul>
        {referater.map((referat) => {
          const formattedDate = getLongDateFormat(referat.tid);
          const referatPath = `${routeBasePath}/referat/${referat.uuid}`;

          return (
            <li key={referat.tid}>
              <RouterLenke
                href={referatPath}
                trackingName={Events.TidligereReferat}
              >
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
