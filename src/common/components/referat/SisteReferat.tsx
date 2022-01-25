import {Brev} from "@/common/api/types/brevTypes";
import {useRouteBasePath} from "@/common/hooks/routeHooks";
import {getLongDateFormat} from "@/common/utils/dateUtils";
import {LinkPanel} from "@navikt/ds-react";
import React from "react";

const texts = {
    text: "Referatet oppsummerer det vi snakket om i dialogmøtet",
};

interface Props {
    referat: Brev;
}

const SisteReferat = ({referat}: Props) => {
    const routeBasePath = useRouteBasePath();
    const referatPath = `${routeBasePath}/referat/${referat.uuid}`

    return (
        <LinkPanel href={referatPath}>
            <LinkPanel.Title>
                Referat fra {getLongDateFormat(referat.tid)}
            </LinkPanel.Title>
            <LinkPanel.Description>{texts.text}</LinkPanel.Description>
        </LinkPanel>
    );
};

export default SisteReferat;
