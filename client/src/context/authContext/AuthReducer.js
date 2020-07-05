import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT  } from '../types';
  
export default ( state, action ) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
            };
        case LOGIN_FAIL:
            return {
                ...state,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_FAIL:
            return {
                ...state,
            };
        case LOGOUT:
            return {
                ...state,
            };
        default: 
        return state;
    }
};