import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuth } from './helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({ name: '', email: '', password: '', buttonText: 'Signup' });
    const { name, email, password, buttonText } = values;

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });

        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post('/api/signup', body, config);
            setValues({ name: '', email: '', password: '', buttonText: 'Submitted' });
            toast.success(res.data.message);

        } catch (err) {
            setValues({ name: '', email: '', password: '', buttonText: 'Submit' });
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <Fragment>
            <div className="col-md-6 offset-md-3">
                { isAuth() ? <Redirect to='/' /> : null }
                <h1 className="pt-5 pb-3 text-center">Signup</h1>
                <form onSubmit={ handleOnSubmit }>
                    <div className="form-group">
                        <label className="text-muted" htmlFor="name">Name</label>
                        <input onChange={ handleOnChange } name="name" placeholder="Name" value={ name } type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted" htmlFor="email">Email</label>
                        <input onChange={ handleOnChange } placeholder="Youremail@example.com" name="email" value={ email } type="email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted" htmlFor="password">Password</label>
                        <input onChange={ handleOnChange } placeholder="Password" name="password" value={ password } type="password" className="form-control"/>
                    </div>
                    <div>
                    <button className="btn btn-primary" type="submit">{ buttonText }</button>
                    </div>
                </form>
                <br />
                <Link to='/forgot-password' className='btn btn-sm btn-outline-danger'>Forgot password</Link>
            </div>
        </Fragment>
    )
}

export default Signup;
