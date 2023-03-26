"use client"
import { useState, useEffect, useContext, createContext } from 'react';
import initializeAmplify from "./initialize";
import registerAuthListeners from "./hub";
import { Auth, Hub } from 'aws-amplify';

initializeAmplify();

registerAuthListeners();

const AuthStateContext = createContext({
  user: null,
  Auth
});

export const Provider = ( { children }
    : { children: React.ReactChild | React.ReactChild[] }
  ) => {

    let [user, setUser] = useState(null)

    useEffect(() => {
      const updateUser = async () => {
        try {
          let user = await Auth.currentAuthenticatedUser();
          setUser(user);
        } catch {
          setUser(null);
        }
      }

      // listen for login/signup events
      const cleanup = Hub.listen('auth', updateUser) 

      // check manually the first time because we won't get a Hub event
      updateUser();
      return () => cleanup()
    }, []);
  
    return (
      <AuthStateContext.Provider value={{ Auth, user }}>
        {children}
      </AuthStateContext.Provider>
    );
};

export const useAuthState = () => useContext(AuthStateContext);
