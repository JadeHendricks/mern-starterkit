import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import AuthContext from '../../../context/authContext/AuthContext';

const Google = () => {

    const { externalAuthentication } = useContext(AuthContext);

    const responseGoogle = async (response) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ idToken: response.tokenId });

        try {
            const res = await axios.post('/api/auth/google-login', body, config);   
            externalAuthentication(res);
        } catch (err) {
            console.error(err.response);
        } 
    }
    
    return (
        <div className='pb-3'>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={ renderProps => (
                    <button onClick={ renderProps.onClick } disabled={ renderProps.disabled } className="btn btn-danger btn-block">Login with Google</button>
                )}
                onSuccess={ responseGoogle }
                onFailure={ responseGoogle }
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google;
