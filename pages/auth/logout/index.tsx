import { useEffect, useState } from "react";
import { useAuthState } from "../../../contexts/authentication";
import Header from '../../../components/Header';

const SignOut = function (): JSX.Element {
  const { Auth } = useAuthState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await Auth.signOut();
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
      <main>
        {loading && 
          <h1>Working ...</h1>
        }
        {!loading &&
          <h1>You've been logged out</h1>
        }
      </main>
    </> 
  );
};


export default SignOut;
