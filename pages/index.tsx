import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './Home.module.css';

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
        <a
          href="https://www.linkedin.com/in/aleksander-sobieraj/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </footer>
    </div>
  );
};

export default Home;
