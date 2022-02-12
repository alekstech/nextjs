import { ReactElement } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = function({ Component, pageProps }: AppProps):ReactElement {
  return <Component {...pageProps} />;
};
export default MyApp;
