import React, { Fragment, useState } from 'react';
import { authenticate, isAuth } from './helpers';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
    const [values, setValues] = useState({ email: '', password: '', buttonText: 'Sign in' });
    const { email, password, buttonText } = values;

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });

        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/signin', body, config);

            authenticate(res, () => {
                setValues({ email: '', password: '', buttonText: 'Signing in...' });
                toast.success(`Hey ${res.data.user.name}, welcome to the authentication boilerplate`);
                setTimeout(() => {
                    isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
                }, 5500);

            });

        } catch (err) {
            setValues({ email: '', password: '', buttonText: 'Sign in' });
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <Fragment>
            <div className="col-md-6 offset-md-3">
                <h1 className="pt-5 pb-3 text-center">Sign in</h1>
                <form onSubmit={ handleOnSubmit }>
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
            </div>
        </Fragment>
    )
}

export default Signin;
