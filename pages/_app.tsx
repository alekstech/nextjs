import { ReactElement, useEffect } from 'react';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from '../contexts/authentication';
import usePreferredColorScheme from '../contexts/theme/usePreferredColorScheme';
import asciiLogo from '../public/asciiLogo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import * as gtag from '../analytics/gtag';

const CustomApp = function({ Component, pageProps }: AppProps):ReactElement {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // Print a logo in console
    console.log(asciiLogo);
  }, []);

  // Match color scheme to user's system
  usePreferredColorScheme();

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};
export default CustomApp;
