import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import Router from 'next/router';

export const registerAuthListeners = () => {
  Hub.listen("auth", ({ payload: { event } }) => {
    switch (event) {
      case "signIn":
        Auth.currentAuthenticatedUser()
          .then(() => {
            const path = "/";
            Router.push(path);
          })
          .catch(e => {
            console.log({e});
            Router.push("/auth/login");
          });
        break;
      case 'signUp':
        Auth.currentAuthenticatedUser()
          .then(() => {
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