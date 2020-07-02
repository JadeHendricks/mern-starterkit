import React, { Fragment, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
    const [values, setValues] = useState({ name: '', token: '', newPassword: '', buttonText: 'Submit' });
    const { name, token, newPassword, buttonText } = values;

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);

        if (token) {
            setValues({ ...values, name, token });
        }
        // eslint-disable-next-line
    }, []);

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });

        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ newPassword, resetPasswordLink: token });

        try {
            const res = await axios.put('/api/reset-password', body, config);

            setValues({ ...values, buttonText: 'Submit' });
            toast.success(res.data.message);

        } catch (err) {
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <section className="py-5">
            <div className="col-md-8 offset-md-2 col-12">
                <div className="card border-secondary mb-3">
                    <div className="card-header">Hello <strong className="text-success">{ name }</strong>, please enter in your new password</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={ handleOnSubmit }>
                                    <div className="form-group">
                                        <label className="text-muted" htmlFor="newPassword">New password</label>
                                        <input onChange={ handleOnChange } placeholder="New password" name="newPassword" value={ newPassword } type="password" className="form-control" required />
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

export default Reset;
