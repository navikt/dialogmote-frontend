import {Brev} from "@/common/api/types/brevTypes";
import Link from "@/common/components/navigation/Link";
import {useRouteBasePath} from "@/common/hooks/routeHooks";
import {
    getLongDateFormat,
} from "@/common/utils/dateUtils";
import React from "react";

const linkText = (date: string) => {
    return `Referat fra ${date}`;
}

interface Props {
    referater: Brev[];
}

const GamleReferat = ({referater}: Props) => {
    const routeBasePath = useRouteBasePath();

    if (referater.length > 0) {
        return (
            <ul>
                {referater.map((brev) => {
                    const formattedDate = getLongDateFormat(brev.tid);
                    const referatPath = `${routeBasePath}/referat/${brev.uuid}`

                    return (
                        <li key={brev.tid}>
                            <Link
                                href={referatPath}
                            >{linkText(formattedDate)}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
    return null;
};

export default GamleReferat;
