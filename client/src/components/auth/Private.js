import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie, signout, updateUser } from './helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Private = ({ history }) => {
    const [values, setValues] = useState({ role: '', name: '', email: '', password: '', buttonText: 'Submit' });
    const { role, name, email, password, buttonText } = values;

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const { token } = getCookie();
        const config = { headers: { Authorization: `Bearer ${token}`}};

        try {
            const res = await axios.get('/api/user', config); 
            const { role, name, email } = res.data;
            setValues({ ...values, role, name, email});
        } catch (err) {
            if (err.response.status === 401) {
                signout(() => { history.push('/') });
            }
            toast.error(err.response.data.message); 
        }
    }

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { token } = getCookie();
        setValues({ ...values, buttonText: 'Updated' });

        const config = { 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        const body = JSON.stringify({ name, password });

        try {
            const res = await axios.put('/api/user', body, config);
            updateUser(res, () => {
                setValues({ ...values, buttonText: 'Submit' });
                toast.success('Profile updated successfully');
            })
        } catch (err) {
            console.error(err);
            setValues({ ...values, buttonText: 'Submit' });
            // toast.error(err.response.data.message);
        }
    }
    
    return (
        <Fragment>
            <div className="col-md-6 offset-md-3">
                <h1 className="pt-5 pb-3 text-center">Private</h1>
                <p className="lead text-center pb-3">Profile update</p>
                <form onSubmit={ handleOnSubmit }>
                    <div className="form-group">
                        <label className="text-muted" htmlFor="role">Role</label>
                        <input name="role" placeholder="Role" defaultValue={ role } type="text" className="form-control"  disabled />
                    </div>
                    <div className="form-group">
                        <label className="text-muted" htmlFor="name">Name</label>
                        <input onChange={ handleOnChange } name="name" placeholder="Name" value={ name } type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted" htmlFor="email">Email</label>
                        <input placeholder="Youremail@example.com" name="email" defaultValue={ email } type="email" className="form-control" disabled />
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

export default Private;
