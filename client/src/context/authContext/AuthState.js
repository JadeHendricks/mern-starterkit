import React, {useReducer} from "react";
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT  } from '../types';

const AuthState = props => {

  const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;