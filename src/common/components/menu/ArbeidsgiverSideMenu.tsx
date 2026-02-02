import { RootPages, SideMenu } from "@navikt/dinesykmeldte-sidemeny";
import { useOppfolgingsplanUrlAG } from "@/common/hooks/useOppfolgingsplanUrlAG";
import type { Sykmeldt } from "@/types/shared/sykmeldt";

interface Props {
  sykmeldt?: Sykmeldt;
}

export const ArbeidsgiverSideMenu = ({ sykmeldt }: Props) => {
  const oppfolgingsplanUrl = useOppfolgingsplanUrlAG(
    sykmeldt?.fnr,
    sykmeldt?.narmestelederId,
  );

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
        Oppfolgingsplaner: sykmeldt?.narmestelederId
          ? {
              internalRoute: ({ className, children }) => (
                <a className={className} href={oppfolgingsplanUrl}>
                  {children}
                </a>
              ),
              notifications: 0,
            }
          : 0,
        DineSykmeldte: 0,
      }}
    />
  );
};
