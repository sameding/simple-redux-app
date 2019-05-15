import {
    FECTH_LOYALTY_RECEIVED,
    FECTH_LOYALTY_FAILED,
    FECTH_PRODUCT_RECEIVED,
    REDEEM_PRODUCT_RECEIVED,
    REDEEM_PRODUCT_FAILED
 } from '../actions/types';

 const initialState = {
    hasError: false,
    isLoading: true,
    activeLoyalty: null,
    activeProduct: null,
    status: null
}

export default function loyaltyReducer(state = initialState, action) {
	let newState = state;
    switch (action.type) {
        case FECTH_LOYALTY_RECEIVED:
        case REDEEM_PRODUCT_RECEIVED:
            newState = Object.assign({}, state, { activeLoyalty: action.response});
            return newState;
        case FECTH_LOYALTY_FAILED:
        case REDEEM_PRODUCT_FAILED:
            newState = Object.assign({}, state, { hasError: true});
            return newState;
        case FECTH_PRODUCT_RECEIVED:
            newState = Object.assign({}, state, { activeProduct: action.response});
            return newState;
        default:
            return newState;
    }
}
