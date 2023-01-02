import { Auth } from 'aws-amplify';

// Add Authorization header
export const addAuth = async (init: RequestInit) => {
  const session = await Auth.currentSession();
  const token = session.getAccessToken();
  const jwt = token.getJwtToken();
  let modified: RequestInit = {};

  if (init !== undefined) {
    const headers = init.headers || {};
    modified = {
      ...init,
      headers: {
        ...headers,
        Authorization: jwt,
      },
    };
  }

  return modified;
};

export default addAuth;
