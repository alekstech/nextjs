import { ReactElement, useEffect } from 'react';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from '../contexts/authentication';
import usePreferredColorScheme from '../contexts/theme/usePreferredColorScheme';
import setDynamicViewportHeightUnit from '../styles/setDynamicViewportHeightUnit';

const CustomApp = function({ Component, pageProps }: AppProps):ReactElement {
  usePreferredColorScheme();
  useEffect(() => {
    setDynamicViewportHeightUnit();
  });

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default CustomApp;
