import React, { Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { isAuth, signout } from '../components/auth/helpers';

const Navigation = ({ history }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink activeClassName='active' exact to='/' className="navbar-brand text-light">Mern Authentication</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'> 
                        <NavLink activeClassName='active' exact to='/' className='nav-link text-light'>Home</NavLink>
                    </li>
                    { !isAuth() && (
                        <Fragment>
                            <li className='nav-item'>
                                <NavLink activeClassName='active' exact to='/signup' className='nav-link text-light'>Signup</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink activeClassName='active' exact to='/signin' className='nav-link text-light'>Sign in</NavLink>
                            </li>
                        </Fragment>
                    )}

                    { isAuth() && isAuth().role === 'admin' && (
                        <Fragment>
                            <li className='nav-item'>
                                <NavLink activeClassName='active' className='nav-link' to='/admin'>{ isAuth().name }</NavLink>
                            </li>
                            <li className='nav-item'>
                                <span className='nav-link' style={{ cursor: 'pointer', color: '#fff' }} onClick={ (e) => signout(() => { e.preventDefault(); history.push('/'); }) }>Sign out</span>
                            </li>
                        </Fragment>
                    )}

                    { isAuth() && isAuth().role === 'subscriber' && (
                        <Fragment>
                            <li className='nav-item'>
                                <NavLink activeClassName='active' className='nav-link' to='/private'>{ isAuth().name }</NavLink>
                            </li>
                            <li className='nav-item'>
                                <span className='nav-link' style={{ cursor: 'pointer', color: '#fff' }} onClick={ (e) => signout(() => { e.preventDefault(); history.push('/'); }) }>Sign out</span>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    )
}


export default withRouter(Navigation);