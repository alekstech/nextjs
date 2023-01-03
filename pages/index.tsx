import type { NextPage } from 'next';
import Head from 'next/head';
import PrefetchedLink from '../components/PrefetchedLink';
import ColorPalette from '../components/ColorPalette';
import styles from './Home.module.css';
import Cluster from '../components/Layout/cluster';
import Header from '../components/Header';

const MonkSkintoneScale = [
  "#f6ede4",
  "#f3e7db",
  "#f7ead0",
  "#eadaba",
  "#d7bd96",
  "#a07e56",
  "#825c43",
  "#604134",
  "#3a312a",
  "#292420"
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Aleks Sobieraj</title>
        <meta name="description" content="Aleks Sobieraj, web developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header className={styles.header} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Aleks Sobieraj
        </h1>

        <ColorPalette colors={MonkSkintoneScale} />

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
