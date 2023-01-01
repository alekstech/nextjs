import { ReactElement, useEffect } from 'react';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from '../contexts/authentication';
import usePreferredColorScheme from '../contexts/theme/usePreferredColorScheme';
import asciiLogo from '../public/asciiLogo';

const CustomApp = function({ Component, pageProps }: AppProps):ReactElement {

  useEffect(() => {
    // Print a logo in console
    console.log(asciiLogo);
  }, []);

  // Match color scheme to user's system
  usePreferredColorScheme();

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default CustomApp;
