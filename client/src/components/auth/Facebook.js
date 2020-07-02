import React, { Fragment } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';

const Facebook = ({ informParent }) => {

    const responseFacebook = async (response) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ accessToken: response.accessToken, userID: response.userID });

        try {
            const res = await axios.post('/api/facebook-login', body, config);   
            informParent(res);
        } catch (err) {
            console.log("error", err);
            console.error(err.response);
        } 
    }
    
    return (
        <div className='pb-3'>
        <FacebookLogin
            appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
            autoLoad={ false }
            callback={responseFacebook}
            render={renderProps => (
                <button onClick={renderProps.onClick} className="btn btn-outline-primary btn-block">Login with Facebook</button>
            )}
        />
        </div>
    )
}

export default Facebook;
