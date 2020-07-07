import React, { Fragment, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import './App.css';
import Register from './components/auth/local/Register';
import Login from './components/auth/local/Login';
import ActivateAccount from './components/auth/local/ActivateAccount';
import ForgotPassword from './components/auth/local/ForgotPassword';
import ResetPassword from './components/auth/local/ResetPassword';
import Base from './components/layouts/Base';
import Navigation from './components/layouts/Navigation';
import Dashboard from './components/layouts/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from "./context/authContext/AuthState";

function App() {

  useEffect(() => {
    isLoggedin();

  }, []);

  const isLoggedin = async () => {
    try {
      const res = await axios.get('/api/auth/isloggedin');
      //TODO
    } catch (err) { 
      console.log('User is not logged in 2');
    }
  }

  return (
    <AuthState>
      <Router>
        <Fragment>
          <ToastContainer />
          <Navigation />
          <div className="container">
            <Switch>
              <Route path='/' exact component={ Base } />
              <Route path='/signup' exact component={ Register } />
              <Route path='/signin' exact component={ Login } />
              <Route path='/forgot-password' exact component={ ForgotPassword } />
              <Route path='/auth/password/reset/:token' exact component={ ResetPassword } />
              <Route path='/auth/activate/:token' exact component={ ActivateAccount } />
              <PrivateRoute path='/dashboard' exact component={ Dashboard } />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
