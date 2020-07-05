import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Register from './components/auth/local/Register';
import Login from './components/auth/local/Login';
import ActivateAccount from './components/auth/local/ActivateAccount';
import ForgotPassword from './components/auth/local/ForgotPassword';
import ResetPassword from './components/auth/local/ResetPassword';
import Base from './components/layouts/Base';
import Navigation from './components/layouts/Navigation';
import AdminProfile from './components/profiles/AdminProfile';
import PrivateProfile from './components/profiles/PrivateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

import AuthState from "./context/authContext/AuthState";

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <ToastContainer />
          <Navigation />
          <div className="container">
            <Switch>
              <Route path='/signup' exact component={ Register } />
              <Route path='/signin' exact component={ Login } />
              <Route path='/' exact component={ Base } />
              <Route path='/forgot-password' exact component={ ForgotPassword } />
              <Route path='/auth/password/reset/:token' exact component={ ResetPassword } />
              <Route path='/auth/activate/:token' exact component={ ActivateAccount } />
              <PrivateRoute path='/private' exact component={ PrivateProfile } />
              <AdminRoute path='/admin' exact component={ AdminProfile } />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
