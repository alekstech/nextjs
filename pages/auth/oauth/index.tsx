import { useEffect } from 'react';
import Router from 'next/router';
import { useAuthState } from '../../../contexts/authentication';
import { Auth } from 'aws-amplify';

const Oauth = (): React.ReactNode => {
  const verifyLogin = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      Router.push("/");
    } catch (err) {
      console.log({err});
      Router.push("/auth/login");
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  return null;
};

export default Oauth;
