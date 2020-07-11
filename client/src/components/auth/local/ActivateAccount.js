import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const ActivateAccount = ({ match, history }) => {
    const [values, setValues] = useState({ name: '', token: '', show: true });
    const { name, token } = values;

    useEffect(() => {
        const token = match.params.token;
        if (token) {
            const { name } = jwt.decode(token);
            setValues({  ...values, name, token });
        }
    // eslint-disable-next-line
    }, [match.params.token]);

    const handleActivationClick = async () => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ token });

        try {
            const res = await axios.post('/api/auth/account-activation', body, config);
            setValues({ ...values, show: false });
            if (res.status === 201) {
                history.push('/signin');
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
        <section className="py-5">
            <div className="col-md-8 offset-md-2 col-12">
                <div className="card border-secondary mb-3">
                    <div className="card-header">Hello <strong className="text-success">{ name }</strong>, ready to activate you account?</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-outline-primary" onClick={ handleActivationClick }>Activate Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ActivateAccount;
