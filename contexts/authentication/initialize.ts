import Amplify from '@aws-amplify/core';
let port = "";

if (process.env.NODE_ENV === 'development') {
  port = ":3000";
}

const redirectSignIn = `https://aleks.tech${port}/auth/oauth`;
const redirectSignOut = `https://aleks.tech${port}/auth/logout`;


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
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: '.aleks.tech',
      // OPTIONAL - Cookie path
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: true
    },

    // OPTIONAL - customized storage object
    // storage: new MyStorage(),

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "alekstech.auth.us-east-1.amazoncognito.com",
      scope: ["email", "profile", "openid"],
      redirectSignIn,
      redirectSignOut,
      responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};

const initializeAmplify = () => {
  Amplify.configure(config);
};

export default initializeAmplify;