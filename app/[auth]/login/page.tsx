'use client';
import React from 'react';
import { Amplify, Auth } from "aws-amplify"
import { merged } from "../../../contexts/authentication/initialize";

// Amplify.configure(merged)
type SignInParameters = {
  username: string;
  password: string;
};

export async function signIn({ username, password }: SignInParameters) {
  try {
    const user = await Auth.signIn(username, password);
    console.log('signed in');
  } catch (error) {
    console.log('error signing in', error);
  }
}

export default function Page() {
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const signInParams = Object.fromEntries(formData.entries()) as SignInParameters;
    console.log(signInParams)
    signIn(signInParams);
  }

  return <>
    <form method="POST" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" autoComplete="email"/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" autoComplete="password"/>
      <button type="submit">Log in</button>
    </form>
  </>
};
