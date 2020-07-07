import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuth } from '../helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Google from '../external/Google';
import Facebook from '../external/Facebook';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Register = ({ history }) => {
    const [values, setValues] = useState({ name: '', email: '', password: '', buttonText: 'Register' });
    const { name, email, password, buttonText } = values;

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const informParent = reponse => {
        authenticate(reponse, () => {
            toast.success(`Hey ${reponse.data.user.name}, welcome to the authentication boilerplate`);
            setTimeout(() => {
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
            }, 5500);
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Registering...' });

        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post('/api/auth/register', body, config);
            setValues({ name: '', email: '', password: '', buttonText: 'Register' });
            toast.success(res.data.message);

        } catch (err) {
            setValues({ name: '', email: '', password: '', buttonText: 'Register' });
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <section className="py-5">
            <div className="col-md-8 offset-md-2 col-sm-12">
                <div className="card border-secondary mb-3">
                    <div className="card-header">Register</div>
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
                                        <label className="text-muted" htmlFor="name">Name</label>
                                        <input onChange={ handleOnChange } name="name" placeholder="Name" value={ name } type="text" className="form-control"/>
                                    </div>
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

export default Register;
