import { useEffect, useState } from "react";
import { useAuthState } from "../../../contexts/authentication";
import Header from '../../../components/Header';

const SignIn = function (): JSX.Element {
  const { Auth } = useAuthState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await Auth.federatedSignIn();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <Header />
    </> 
  );
};


export default SignIn;
