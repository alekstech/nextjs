import { Auth, Hub } from 'aws-amplify';
import Router from 'next/router';
import cookie from 'cookie';

const handleSignIn = async () => {
  const session = await Auth.currentSession();
  const token = session.getIdToken();
  const jwt = token.getJwtToken();

  Auth.currentAuthenticatedUser()
    .then(() => {
      const expires = new Date(Date.now() + (3600 * 1000 * 24 * 1)); // 1 day
      const serialized = cookie.serialize('Authorization', jwt, {
        domain: ".aleks.tech",
        sameSite: 'strict',
        secure: true,
        path: '/',
        expires,
        maxAge: 60 * 60 * 24 * 1 // 1 day
      });
      document.cookie = serialized;
      const path = "/";
      Router.push(path);
    })
    .catch(e => {
      console.log({e});
      Router.push("/auth/login");
    });
};

const handleSignOut = async () => {
  const expires = new Date(Date.now());
  const serialized = cookie.serialize('Authorization', '', {
    domain: ".aleks.tech",
    sameSite: 'strict',
    secure: true,
    path: '/',
    expires,
    maxAge: 0
  });
  document.cookie = serialized;
  console.log('Remove Authorization cookie');
};

export const registerAuthListeners = () => {
  Hub.listen("auth", async ({ payload: { event } }) => {
    switch (event) {
      case "signOut": {
        // handleSignOut();
        break;
      }
      case "signIn": {
        handleSignIn();
        break;
      }
      case 'signUp':
        Auth.currentAuthenticatedUser()
          .then(() => {
          // store access token in context
          const path = "/";
          Router.push(path);
        })
        .catch(() => {
          const path = "/auth/signup";
          Router.push(path);
        });
        break;
      case 'signIn_failure':
        Auth.currentAuthenticatedUser()
          .then(() => {
            const path = "/";
            Router.push(path);
          })
          .catch((e) => {
            console.log({e});
            // const path = "/auth/login";
            // Router.push(path);
          });
        break;
      // case 'configured':
      //   logger.info('the Auth module is configured');
      //   break;
      // case 'signIn':
      //   logger.info('user signed in');
      //   break;
      // case 'signIn_failure':
      //   logger.error('user sign in failed');
      //   break;
      // case 'signUp':
      //   logger.info('user signed up');
      //   break;
      // case 'signUp_failure':
      //   logger.error('user sign up failed');
      //   break;
      // case 'confirmSignUp':
      //   logger.info('user confirmation successful');
      //   break;
      // case 'completeNewPassword_failure':
      //   logger.error('user did not complete new password flow');
      //   break;
      // case 'autoSignIn':
      //   logger.info('auto sign in successful');
      //   break;
      // case 'autoSignIn_failure':
      //   logger.error('auto sign in failed');
      //   break;
      // case 'forgotPassword':
      //   logger.info('password recovery initiated');
      //   break;
      // case 'forgotPassword_failure':
      //   logger.error('password recovery failed');
      //   break;
      // case 'forgotPasswordSubmit':
      //   logger.info('password confirmation successful');
      //   break;
      // case 'forgotPasswordSubmit_failure':
      //   logger.error('password confirmation failed');
      //   break;
      // case 'verify':
      //   logger.info('TOTP token verification successful');
      //   break;
      // case 'tokenRefresh':
      //   logger.info('token refresh succeeded');
      //   break;
      // case 'tokenRefresh_failure':
      //   logger.error('token refresh failed');
      //   break;
      // case 'cognitoHostedUI':
      //   logger.info('Cognito Hosted UI sign in successful');
      //   break;
      // case 'cognitoHostedUI_failure':
      //   logger.error('Cognito Hosted UI sign in failed');
      //   break;
      // case 'customOAuthState':
      //   logger.info('custom state returned from CognitoHosted UI');
      //   break;
      // case 'customState_failure':
      //   logger.error('custom state failure');
      //   break;
      // case 'parsingCallbackUrl':
      //   logger.info('Cognito Hosted UI OAuth url parsing initiated');
      //   break;
      // case 'userDeleted':
      //   logger.info('user deletion successful');
      //   break;
      // case 'updateUserAttributes':
      //   logger.info('user attributes update successful');
      //   break;
      // case 'updateUserAttributes_failure':
      //   logger.info('user attributes update failed');
      //   break;
      // case 'signOut':
      //   logger.info('user signed out');
      //   break;
    }
  });
};

export default registerAuthListeners;
