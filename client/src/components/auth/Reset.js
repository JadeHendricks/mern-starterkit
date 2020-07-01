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
        <Fragment>
            <div className="col-md-6 offset-md-3">
                <h1 className="pt-5 pb-3 text-center">Hey { name }, Enter in your new password</h1>
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
        </Fragment>
    )
}

export default Reset;
