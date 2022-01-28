import { Events } from "@/common/amplitude/events";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import { useRouteBasePath } from "@/common/hooks/routeHooks";
import { getLongDateFormat } from "@/common/utils/dateUtils";
import React from "react";
import { Brev } from "@/server/data/types/external/BrevTypes";

const linkText = (date: string) => {
  return `Referat fra ${date}`;
};

interface Props {
  referater: Brev[];
}

const GamleReferat = ({ referater }: Props) => {
  const routeBasePath = useRouteBasePath();

  if (referater.length > 0) {
    return (
      <ul>
        {referater.map((brev) => {
          const formattedDate = getLongDateFormat(brev.tid);
          const referatPath = `${routeBasePath}/referat/${brev.uuid}`;

          return (
            <li key={brev.tid}>
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
