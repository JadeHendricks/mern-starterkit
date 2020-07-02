import React from 'react';
import { isAuth } from '../auth/helpers';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => isAuth() && isAuth().role === 'admin' ? (
        <Component {...props} />
    ) : (
        <Redirect to='/signin' />
    )} />
  )
}

export default AdminRoute;