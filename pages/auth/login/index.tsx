import { useEffect, FC } from "react";
import { useAuthState } from "../../../contexts/authentication";
import Header from '../../../components/Header';
import { useRouter } from 'next/router';
import jscookie from "js-cookie";

const SignIn: FC = () => {
  const { Auth } = useAuthState();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      const path = jscookie.get("after-login") || "/";
      router.replace(path);
    } catch (err) {
      router.replace({ pathname: "/auth/redirect", query: { to: "auth" } });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Header />
  );
};


export default SignIn;
