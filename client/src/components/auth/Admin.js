import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie, signout, updateUser } from './helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({ history }) => {
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
            const res = await axios.put('/api/admin', body, config);
            updateUser(res, () => {
                setValues({ ...values, buttonText: 'Submit' });
                toast.success('Profile updated successfully');
            })
        } catch (err) {
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <section className="py-5">
            <div className="col-md-8 offset-md-2 col-12">
            <div className="card border-secondary mb-3">
                <div className="card-header">Admin - Profile update</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Admin;
