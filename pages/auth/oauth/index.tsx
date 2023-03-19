import { useEffect } from 'react';
import Router from 'next/router';
import { Auth } from 'aws-amplify';
import jscookie from "js-cookie";

const Oauth = (): React.ReactNode => {
  const verifyLogin = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      const path = jscookie.get("after-login") || "/";
      Router.push(path);
    } catch (err) {
      console.log({err});
      Router.push("/");
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  return null;
};

export default Oauth;
