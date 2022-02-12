import { useEffect } from 'react';
import Router from 'next/router';
import { useAuthState } from '../../../contexts/authentication';

const Oauth = (): React.ReactNode => {
  const { Auth } = useAuthState();

  const verifyLogin = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      const path = "/";
      Router.push(path);
    } catch (err) {
      console.log({err});
      Router.replace({
        pathname: '/auth/error',
        query: {
          message: 'We could not log you in'
        },
      });
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  return null;
};

export default Oauth;
