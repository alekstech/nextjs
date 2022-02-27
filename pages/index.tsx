import type { NextPage } from 'next';
import Head from 'next/head';
import PrefetchedLink from '../components/PrefetchedLink';
import styles from './Home.module.css';
import Cluster from '../components/Layout/cluster';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Aleks Sobieraj</title>
        <meta name="description" content="Aleks Sobieraj, web developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Aleks Sobieraj
        </h1>

        <p className={styles.description}>
          web developer
        </p>

        <p>Toronto</p>
      </main>

      <footer className={styles.footer}>
        <Cluster justify="space-around">
          <PrefetchedLink href="/blog/portfolio">
            About
          </PrefetchedLink>
        </Cluster>
      </footer>
    </div>
  );
};

export default Home;
