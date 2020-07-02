import React from 'react';
import { isAuth } from '../auth/helpers';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => !isAuth() ? (
      <Redirect to='/signin' />
    ) : (
      <Component {...props} />
    )} />
  )
}

export default PrivateRoute;