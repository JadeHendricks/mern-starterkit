import { LOGIN_SUCCESS, LOGIN_ERROR, USER_LOADED, AUTH_ERROR, LOGOUT  } from '../types';
  
export default ( state, action ) => {
    switch (action.type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false
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