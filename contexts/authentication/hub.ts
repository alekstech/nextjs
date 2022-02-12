import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import Router from 'next/router';
import cookie from 'cookie';

const asdf= async () => {
  const session = await Auth.currentSession();
  const token = session.getIdToken();
  const jwt = await token.getJwtToken();

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
      console.log('Set Authorization cookie', jwt);
      const path = "/";
      Router.push(path);
    })
    .catch(e => {
      console.log({e});
      Router.push("/auth/login");
    });
};

export const registerAuthListeners = () => {
  Hub.listen("auth", async ({ payload: { event } }) => {
    switch (event) {
      case "signIn": {
        asdf();
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
            const path = "/auth/login";
            Router.push(path);
          });
        break;
    }
  });
};

export default registerAuthListeners;
