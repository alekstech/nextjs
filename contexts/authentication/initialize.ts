import awsconfig from '../../aws-exports';
import Amplify from '@aws-amplify/core';

const stage = (process.env.NEXT_PUBLIC_STAGE && process.env.NEXT_PUBLIC_STAGE !== "null") ? `${process.env.NEXT_PUBLIC_STAGE}.` : ``;
const port = (process.env.NEXT_PUBLIC_PORT && process.env.NEXT_PUBLIC_PORT !== "null") ? `:${process.env.NEXT_PUBLIC_PORT}` : ``;
const redirectStem = `https://${stage}aleks.tech${port}`;
const redirectSignIn = redirectStem + `/auth/oauth`;
const redirectSignOut = redirectStem + `/auth/logout`;

export const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_tLTUaFeeq",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "48d0ig6qvd3cbh6qfk60t4g75q",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: '.aleks.tech',
    //   // OPTIONAL - Cookie path
    //   path: '/',
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - Cookie secure flag
    //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //   secure: true
    // },

    // OPTIONAL - customized storage object
    // storage: new MyStorage(),

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "auth.aleks.tech",
      scope: ["email", "profile", "openid"],
      redirectSignIn,
      redirectSignOut,
      responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};

const initializeAmplify = () => {
  const merged = {
    ...config,
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      redirectSignIn: config.Auth.oauth.redirectSignIn,
      redirectSignOut: config.Auth.oauth.redirectSignOut,
      domain: "auth.aleks.tech",
    },
    ssr: true
  }
  Amplify.configure(merged);
};

export default initializeAmplify;