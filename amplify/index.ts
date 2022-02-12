import Amplify from '@aws-amplify/core';
import config from "./config";

const initializeAmplify = () => {
  Amplify.configure(config);
};

export default initializeAmplify;