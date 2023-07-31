import { useEffect } from 'react';
import Router from 'next/router';
import { Auth } from 'aws-amplify';

const Oauth = (): React.ReactNode => {
  const verifyLogin = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      Router.push("/");
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  return null;
};

export default Oauth;
