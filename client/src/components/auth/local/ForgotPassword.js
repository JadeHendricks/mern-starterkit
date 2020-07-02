import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ForgotPassword = () => {
    const [values, setValues] = useState({ email: '', buttonText: 'Submit' });
    const { email, buttonText } = values;

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });

        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ email });

        try {
            const res = await axios.put('/api/auth/forgot-password', body, config);

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
                    <div className="card-header">Forgot password</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={ handleOnSubmit }>
                                    <div className="form-group">
                                        <label className="text-muted" htmlFor="email">Email address</label>
                                        <input onChange={ handleOnChange } placeholder="you@example.com" name="email" value={ email } type="email" className="form-control"/>
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

export default ForgotPassword;
