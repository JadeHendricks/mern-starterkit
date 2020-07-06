import React, {useReducer} from "react";
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR, AUTH_ERROR, LOGOUT  } from '../types';

const AuthState = props => {

  const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null
  };

  const login = async (email, password) => {
    const config = { headers: {'Content-Type': 'application/json'} };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth/login', body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
    } catch (err) {
      dispatch({ type: LOGIN_ERROR });
    }
  }

  const logout = async () => {
    try {
      const res = await axios.get('/api/auth/logout');
      dispatch({ type: LOGOUT });
      if (res.data.message === 'success') {
        window.location.reload(true);
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      user: state.loading,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;