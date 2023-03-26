import { useEffect } from "react";
import { useAuthState } from "../../../contexts/authentication";
import Header from '../../../components/Header';
import { useRouter } from 'next/router';

// If clicks back button from Cognito's Hosted UI, redirect them to home page

const SignIn = function (): JSX.Element {
  const { Auth } = useAuthState();
  const router = useRouter();
  const { to = 'app' } = router.query;

  const handleRedirect = async () => {
    if (to === 'auth') {
      router.replace(router.route);
      await Auth.federatedSignIn();
    }
    else router.push('/');
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <>
      <Header />
    </> 
  );
};


export default SignIn;
