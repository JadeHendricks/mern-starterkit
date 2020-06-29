import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({ match }) => {

    const [values, setValues] = useState({ name: '', token: '', show: true });
    const { name, token } = values;

    useEffect(() => {
        const token = match.params.token;
        if (token) {
            const { name } = jwt.decode(token);
            setValues({  ...values, name, token });
        }

    }, []);

    const handleActivationClick = async () => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ token });

        try {
            const res = await axios.post('/api/account-activation', body, config);
            setValues({ ...values, show: false });
            toast.success(res.data.message);

        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    
    return (
        <Fragment>
            <div className="col-md-6 offset-md-3 text-center">
                <h1 className="pt-5 pb-3">Hey { name }, Ready to activate you account?</h1>
                <button className="btn btn-outline-primary" onClick={ handleActivationClick }>Activate Account</button>
            </div>
        </Fragment>
    )
}

export default Activate;
