import { LOGIN_SUCCESS, LOGIN_ERROR, AUTH_ERROR, LOGOUT  } from '../types';
  
export default ( state, action ) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case LOGIN_ERROR:
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                user: null
            };
        default: 
        return state;
    }
};