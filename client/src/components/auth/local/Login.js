import React, { useState } from 'react';
import { authenticate, isAuth } from '../helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Google from '../external/Google';
import Facebook from '../external/Facebook';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Login = ({ history }) => {
    const [values, setValues] = useState({ email: '', password: '', buttonText: 'Login' });
    const { email, password, buttonText } = values;

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const informParent = reponse => {
        authenticate(reponse, () => {
            toast.success('Welcome to the authentication boilerplate');
            setTimeout(() => {
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
            }, 5500);
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Logging in...' });

        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth/login', body, config);
            informParent(res);

        } catch (err) {
            setValues({ email: '', password: '', buttonText: 'Login' });
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <section className="py-5">
            <div className="col-md-8 offset-md-2 col-sm-12">
                <div className="card border-secondary mb-3">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <Google informParent={ informParent }/>
                            </div>
                            <div className="col-sm-6 col-12">
                                <Facebook informParent={ informParent } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={ handleOnSubmit }>
                                    <div className="form-group">
                                        <label className="text-muted" htmlFor="email">Email address</label>
                                        <input onChange={ handleOnChange } placeholder="you@example.com" name="email" value={ email } type="email" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted" htmlFor="password">Password</label>
                                        <input onChange={ handleOnChange } placeholder="••••••••" name="password" value={ password } type="password" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" type="submit">{ buttonText }</button>
                                    </div>
                                </form>
                                <hr />
                                <Link to='/forgot-password' className='text-danger'>Forgot password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
