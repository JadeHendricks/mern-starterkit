import React from 'react';
import { isAuth } from './helpers';
import { Route, Redirect } from 'react-router-dom';

//takes in a component and all of it's props
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