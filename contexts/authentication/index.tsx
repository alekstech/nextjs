import { useReducer, useContext, createContext } from 'react';
import Auth from '@aws-amplify/auth';
import initializeAmplify from "../../amplify";
import registerAuthListeners from "./hub";

initializeAmplify();

registerAuthListeners();

interface State {
  Auth: typeof Auth;
}
interface Action {
  type: string
}

const initialState: State = {
  Auth
};

const actions = {
  'LOG_IN': 'LOG_IN',
};

const AuthStateContext = createContext({} as State);
const AuthDispatchContext = createContext({} as React.Dispatch<Action>);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actions.LOG_IN:
      console.log('LOG_IN action received');
      return state;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const Provider = ( { children }
    : { children: React.ReactChild | React.ReactChild[] }
  ) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <AuthDispatchContext.Provider value={dispatch}>
        <AuthStateContext.Provider value={state}>
          {children}
        </AuthStateContext.Provider>
      </AuthDispatchContext.Provider>
    );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthReducer = () => useContext(AuthDispatchContext);
