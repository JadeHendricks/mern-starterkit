import React, { Fragment } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { isAuth, signout } from '../components/auth/helpers';

const Navigation = ({ history }) => {
    return (
        <ul className='nav nav-tabs bg-primary'>
            <li className='nav-item'> 
                <NavLink activeClassName='active text-dark' exact to='/' className='nav-link text-light'>Home</NavLink>
            </li>
            { !isAuth() && (
                <Fragment>
                    <li className='nav-item'>
                        <NavLink activeClassName='active text-dark' exact to='/signup' className='nav-link text-light'>Signup</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink activeClassName='active text-dark' exact to='/signin' className='nav-link text-light'>Sign in</NavLink>
                    </li>
                </Fragment>
            )}

            { isAuth() && isAuth().role === 'admin' && (
                <Fragment>
                    <li className='nav-item'>
                        <Link activeClassName='active text-dark' className='nav-link' to='/admin'>{ isAuth().name }</Link>
                    </li>
                    <li className='nav-item'>
                        <span className='nav-link' style={{ cursor: 'pointer', color: '#fff' }} onClick={ (e) => signout(() => { e.preventDefault(); history.push('/'); }) }>Sign out</span>
                    </li>
                </Fragment>
            )}

            { isAuth() && isAuth().role === 'subscriber' && (
                <Fragment>
                    <li className='nav-item'>
                        <Link activeClassName='active text-dark' className='nav-link' to='/private'>{ isAuth().name }</Link>
                    </li>
                    <li className='nav-item'>
                        <span className='nav-link' style={{ cursor: 'pointer', color: '#fff' }} onClick={ (e) => signout(() => { e.preventDefault(); history.push('/'); }) }>Sign out</span>
                    </li>
                </Fragment>
            )}

        </ul>
    )
}

export default withRouter(Navigation);