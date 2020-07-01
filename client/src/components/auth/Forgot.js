import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = () => {
    const [values, setValues] = useState({ email: '', buttonText: 'Submit' });
    const { email, buttonText } = values;

    const handleOnChange = e => setValues({ ...values, [e.target.name]: e.target.value });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });

        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ email });

        try {
            const res = await axios.put('/api/forgot-password', body, config);

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
                <h1 className="pt-5 pb-3 text-center">Forgot password</h1>
                <form onSubmit={ handleOnSubmit }>
                    <div className="form-group">
                        <label className="text-muted" htmlFor="email">Email</label>
                        <input onChange={ handleOnChange } placeholder="Youremail@example.com" name="email" value={ email } type="email" className="form-control"/>
                    </div>
                    <div>
                    <button className="btn btn-primary" type="submit">{ buttonText }</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Forgot;
