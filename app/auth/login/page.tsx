"use client"
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import initializeAmplify from "../../../contexts/authentication/initialize";

initializeAmplify();

const Component = () => {
  useEffect(() => {
    Auth.federatedSignIn();
  });
  return (
    <div>
      login page
    </div>
  );
};

export default Component;
