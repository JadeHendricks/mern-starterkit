import React, { useReducer, useEffect } from "react";
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGOUT  } from '../types';

const AuthState = props => {

  useEffect(() => {
    isLoggedin();
  // eslint-disable-next-line
  }, []);

  const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null
  };

  const isLoggedin = async () => {
    try {
      const res = await axios.get('/api/auth/isloggedin');
      if (res.status === 200) {
        loadUser();
      }
    } catch (err) { 
      //could be made better //TODO
      if (window.location.href === 'http://localhost:3000/' || window.location.href === 'http://localhost:3000/signup' || window.location.href.startsWith('http://localhost:3000/auth/')) {
        dispatch({ type: AUTH_ERROR });
        return;
      } else {
        props.history.push('/signin');
        dispatch({ type: AUTH_ERROR });
      }
    }
  }

  const externalAuthentication = (response) => {
    cookie.set('authtoken', response.data.token, {
      expires: process.env.REACT_APP_COOKIE_EXPIRES_IN
    });
    isLoggedin();
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
        await axios.post('/api/auth/login', body, config);
        dispatch({ type: LOGIN_SUCCESS });
        loadUser();
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  }

  const register = async (name, email, password) => {
    const config = { headers: {'Content-Type': 'application/json'} };
    const body = JSON.stringify({ name, email, password });

    try {
        await axios.post('/api/auth/register', body, config);
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
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
      user: state.user,
      externalAuthentication,
      register,
      login,
      logout,
      loadUser
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}

export default withRouter(AuthState);