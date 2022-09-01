import { SideMenu, RootPages } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../types/shared/sykmeldt";

export const ArbeidsgiverSideMenu = ({
  sykmeldt,
}: Props): JSX.Element | null => {
  return (
    <SideMenu
      sykmeldtName={sykmeldt?.navn ?? ""}
      sykmeldtId={sykmeldt?.narmestelederId ?? ""}
      activePage={RootPages.Dialogmoter}
      routes={{
        Soknader: 0,
        Sykmeldinger: 0,
        Meldinger: false,
        Dialogmoter: 0,
        Oppfolgingsplaner: 0,
        DineSykmeldte: 0,
      }}
    />
  );
};

interface Props {
  sykmeldt?: Sykmeldt;
}
