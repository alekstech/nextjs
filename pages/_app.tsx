import { ReactElement } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from '../contexts/authentication';

const MyApp = function({ Component, pageProps }: AppProps):ReactElement {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default MyApp;
