import React, { useReducer, useEffect } from "react";
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR, USER_LOADED, AUTH_ERROR, LOGOUT  } from '../types';

const AuthState = props => {

  useEffect(() => {
    if (!state.isAuthenticated && !state.user) {
      isLoggedin();
    }
  }, []);

  const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null
  };

  const isLoggedin = async () => {
    try {
      const res = await axios.get('/api/auth/isloggedin');
      if (res.status === 200) {
        loadUser();
      } else {
        return;
      }
    } catch (err) { 
      dispatch({ type: AUTH_ERROR });
    }
  }

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/user');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  }


  const login = async (email, password) => {
    const config = { headers: {'Content-Type': 'application/json'} };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth/login', body, config);
        dispatch({ type: LOGIN_SUCCESS });
        loadUser();
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
      logout,
      loadUser
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthState;