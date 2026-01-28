import { RootPages, SideMenu } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../types/shared/sykmeldt";

interface Props {
  sykmeldt?: Sykmeldt;
}

export const ArbeidsgiverSideMenu = ({ sykmeldt }: Props) => {
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
