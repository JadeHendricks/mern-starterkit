import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <ul className='nav nav-tabs bg-primary'>
            <li className='nav-item'>
                <Link to='/' className='nav-link text-light'>Home</Link>
            </li>
            <li className='nav-item'>
                <Link to='/signup' className='nav-link text-light'>Signup</Link>
            </li>
        </ul>
    )
}

export default Navigation;