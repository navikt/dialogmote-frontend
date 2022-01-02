import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dialogmøte AG</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>AG!</h1>
      </main>
    </div>
  );
};

export default Home;
