import { ReactElement, useEffect } from 'react';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from '../contexts/authentication';
import usePreferredColorScheme from '../contexts/theme/usePreferredColorScheme';
import setDynamicViewportHeightUnit from '../styles/setDynamicViewportHeightUnit';
import asciiLogo from '../public/asciiLogo';

const CustomApp = function({ Component, pageProps }: AppProps):ReactElement {

  // Do things when page first loads in browser
  useEffect(() => {
    // Print a logo in console
    console.log(asciiLogo);
    
    // Match color scheme to user's system
    usePreferredColorScheme();
    
    // Switch to dvh? In Safari since 2022
    setDynamicViewportHeightUnit();
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default CustomApp;
