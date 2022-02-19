import { ReactElement } from 'react';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from '../contexts/authentication';
import usePreferredColorScheme from '../contexts/theme/usePreferredColorScheme';

const CustomApp = function({ Component, pageProps }: AppProps):ReactElement {
  usePreferredColorScheme();

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default CustomApp;
