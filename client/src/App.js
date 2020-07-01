import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './layouts/Navigation';
import Base from './layouts/Base';
import Admin from './components/auth/Admin';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Activate from './components/auth/Activate';
import Private from './components/auth/Private';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import ForgotPassword from './components/auth/Forgot';
import ResetPassword from './components/auth/Reset';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Fragment>
        <ToastContainer />
        <Navigation />
        <div className="container">
          <Switch>
            <Route path='/' exact component={ Base } />
            <Route path='/signup' exact component={ Signup } />
            <Route path='/signin' exact component={ Signin } />
            <Route path='/auth/activate/:token' exact component={ Activate } />
            <PrivateRoute path='/private' exact component={ Private } />
            <AdminRoute path='/admin' exact component={ Admin } />
            <Route path='/forgot-password' exact component={ ForgotPassword } />
            <Route path='/auth/password/reset/:token' exact component={ ResetPassword } />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
