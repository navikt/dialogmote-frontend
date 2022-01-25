import {useBrevSM} from "@/common/api/queries/sykmeldt/brevQueriesSM";
import {useMotebehovSM} from "@/common/api/queries/sykmeldt/motebehovQueriesSM";
import ReferaterPanel from "@/common/components/referat/ReferaterPanel";
import VideoPanel from "@/common/components/video/VideoPanel";
import type {NextPage} from "next";
import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
    const brev = useBrevSM();
    const motebehov = useMotebehovSM();

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
                    <title>Dialogmøte SM</title>
                </Head>

                <main className={styles.main}>
                    <ReferaterPanel referater={referater}/>
                    <VideoPanel/>
                </main>
            </div>
        );
    }

    return <div>Vis en loading-animasjon her..</div>;
};

export default Home;
