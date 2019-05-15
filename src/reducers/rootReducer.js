import { combineReducers } from 'redux';
import { default as UserStore } from './userReducer';
import { default as LoyaltyStore } from './loyaltyReducer';

import { RESET } from '../actions/types';

const appReducer = combineReducers({
    UserStore,
    LoyaltyStore
});

const rootReducer = (state, action) => {
    if (action.type === RESET) {
        state = undefined;
    }
    return appReducer(state, action);
};
export default rootReducer;