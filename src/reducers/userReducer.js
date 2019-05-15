import {
    TOKEN,
    LOGOUT,
    TOKEN_FAILED
 } from '../actions/types';

const initialState = {
    notification: 0
  }

export default function userReducer(state = initialState, action) {
	let newState = state;
    switch (action.type) {
    	case TOKEN:
            newState = Object.assign({}, state, { notification: 1 });
            return newState;
        case LOGOUT:
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            newState = Object.assign({}, state, { notification: 0 });
            return newState;
        case TOKEN_FAILED: 
            newState = Object.assign({}, state, { notification: 2 });
            return newState;
        default:
            return state;
    }
}
