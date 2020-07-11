import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';
import AuthContext from '../../../context/authContext/AuthContext';

const Facebook = () => {

    const { externalAuthentication } = useContext(AuthContext);

    const responseFacebook = async (response) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        const body = JSON.stringify({ accessToken: response.accessToken, userID: response.userID });

        try {
            const res = await axios.post('/api/auth/facebook-login', body, config);
            externalAuthentication(res)  
        } catch (err) {
            console.error(err.response);
        } 
    }
    
    return (
        <div className='pb-3'>
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={ false }
                callback={ responseFacebook }
                render={ renderProps => (
                    <button onClick={ renderProps.onClick } className="btn btn-primary btn-block">Login with Facebook</button>
                )}
            />
        </div>
    )
}

export default Facebook;
