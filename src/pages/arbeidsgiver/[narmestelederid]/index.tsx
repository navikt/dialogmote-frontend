import {useBrevAG} from "@/common/api/queries/arbeidsgiver/brevQueriesAG";
import {useMotebehovAG} from "@/common/api/queries/arbeidsgiver/motebehovQueriesAG";
import {useSykmeldtAG} from "@/common/api/queries/arbeidsgiver/sykmeldtQueriesAG";
import InfoTilArbeidsgiver from "@/common/components/referat/InfoTilArbeidsgiver";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import {useNarmesteLederId} from "@/common/hooks/useNarmesteLederId";
import type {NextPage} from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";

const Home: NextPage = () => {
    const narmestelederid = useNarmesteLederId();
    const sykmeldt = useSykmeldtAG(narmestelederid);
    const brev = useBrevAG(sykmeldt.data?.fnr);
    const motebehov = useMotebehovAG(
        sykmeldt.data?.fnr,
        sykmeldt.data?.orgnummer
    );

    if (brev.isError) {
        return <div>Her ble det noe feil</div>;
    }

    if (brev.isSuccess) {
        const referater = brev.data.filter(
            (hendelse) => hendelse.brevType === "REFERAT"
        );
        return (
            <div className={styles.container}>
                <Head>
                    <title>Dialogmøte AG</title>
                </Head>

                <main className={styles.main}>
                    <ReferaterPanel
                        referater={referater}
                    >
                        <InfoTilArbeidsgiver/>
                    </ReferaterPanel>
                    <VideoPanel/>
                </main>
            </div>
        );
    }
    return <div>Vis en loading-animasjon her..</div>;
};

export default Home;
