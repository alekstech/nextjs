// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

// CSP directives: developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
const getContentSecurityPolicy = (phase) => {
  const env = phase === PHASE_DEVELOPMENT_SERVER ? "dev" : "prod";
  const directives = {
    defaultSrc: {
      prod: "'self'",
      dev: "'unsafe-inline'"
    },
    scriptSrc: {
      prod: "'self'",
      dev: "'unsafe-inline'"
    }
  };

  return `
    default-src ${directives.defaultSrc[env]};
    script-src ${directives.scriptSrc[env]};
  `
    .replace(/\s{2,}/g, ' ') // replace newline characters with a space
    .trim();
};

const getHeaders = async function (phase) {
  return [
    {
      source: '/:path*', // all routes
      headers: [
        {
          key: 'X-DNS-Prefetch-Control', // proactively resolve DNS from links
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security', // disallow HTTP connections without SSL
          value: 'max-age=63072000; includeSubDomains' // for 2 years, on subdomains too
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff' // use the MIME types specified, don't infer from content
        },
        {
          key: 'Content-Security-Policy',
          value: getContentSecurityPolicy(phase)
        },
        {
          key: 'X-XSS-Protection', // in case the CSP isn't understood
          value: '1; mode=block'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN' // disallow i-framing the website
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin' // only send the hostname when user navigates away from this website
        }
      ],
    },
  ];
};

module.exports = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true, // lint deprecated patterns
    headers: getHeaders(phase),
  };
  return nextConfig;
};
