import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <ul className='nav nav-tabs bg-primary'>
            <li className='nav-item'> 
                <NavLink activeClassName='active text-dark' exact to='/' className='nav-link text-light'>Home</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink activeClassName='active text-dark' exact to='/signup' className='nav-link text-light'>Signup</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink activeClassName='active text-dark' exact to='/signin' className='nav-link text-light'>Sign in</NavLink>
            </li>
        </ul>
    )
}

export default Navigation;