import React from 'react';
import { isAuth } from './helpers';
import { Route, Redirect } from 'react-router-dom';

//takes in a component and all of it's props
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