import React, { useState } from 'react';
import Router from 'next/router';
// import { addAlert } from '../../../store/alert/actions';
// import dynamic from 'next/dynamic';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import Link from "next/link";
import { useAuthState } from "../../../contexts/authentication";

// const Toast = dynamic(() => import('../../../src/components/Toast'));

const addAlert = (m: string) => {
  console.log(m);
};

interface SignInProps {
  email: string
  password: string
}

const SignIn = function (props:SignInProps): JSX.Element {
  const { Auth } = useAuthState();
  const {
    email: propsEmail,
    password: propsPassword
  } = props;

  const [email, setEmail] = useState(propsEmail);
  const [password, setPassword] = useState(propsPassword);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({
    email: '',
    form: '',
    password: ''
  });

  const validateEmail = () => {
    let message = '';
    if (!email) {
      message = 'Email is required';
    } else {
      const re = /\S+@\S+\.\S+/;
      const valid = re.test(email);
      if (!valid) {
        message = 'Enter a valid email';
      }
    }
    setMessages({
      ...messages,
      email: message
    });
  };

  const validatePassword = () => {
    let message = '';
    if (!password) {
      message = 'Password is required';
    }
    setMessages({
      ...messages,
      email: message
    });
  };

  const validateForm = () => {
    validateEmail();
    validatePassword();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    validateForm();
    if (messages.email || messages.password) return;

    setLoading(true);

    try {
      await Auth.signIn(email, password);
      const path = "/";
      Router.push(path);
      // amplify returns a union with any
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let message = "Sign in failed";
      if (err && typeof err.message === "string") {
        message = err.message;
      }
      addAlert(message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = () => {
    const provider = CognitoHostedUIIdentityProvider.Google;
    Auth.federatedSignIn({ provider });
  };


  return (
    <div>
      <h2>Log in</h2>
      <form noValidate>
        <label htmlFor="email" className="display-block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={validateEmail}
          autoComplete="email"
        />
        <p role="alert">{ messages.email }</p>

        <label htmlFor="email" className="display-block">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <p role="alert">{ messages.password }</p>

        <button onClick={handleSubmit} disabled={loading}>
          Log in
        </button>
        <p role='alert'>{messages.form}</p>
      </form>
      <Link href="/auth/register">
        <a className="button">
          Register
        </a>
      </Link>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      {/* <Toast /> */}
    </div>
  );
};

export default SignIn;
