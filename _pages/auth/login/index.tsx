import { useEffect } from "react";
import { useAuthState } from "../../../contexts/authentication";
import GlobalHeader from "../../../components/GlobalHeader";

const SignIn = function (): JSX.Element {
  const { Auth } = useAuthState();

  const handleSubmit = async () => {
    try {
      await Auth.federatedSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <GlobalHeader />
    </>
  );
};

export default SignIn;
