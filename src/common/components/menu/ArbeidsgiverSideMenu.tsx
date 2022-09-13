import { SideMenu, RootPages } from "@navikt/dinesykmeldte-sidemeny";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";

export const ArbeidsgiverSideMenu = (): JSX.Element => {
  const dialogmoteData = useDialogmoteDataAG();

  return (
    <SideMenu
      sykmeldtName={dialogmoteData.data?.sykmeldt?.navn ?? ""}
      sykmeldtId={dialogmoteData.data?.sykmeldt?.narmestelederId ?? ""}
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
