
import { put, takeLatest, call } from 'redux-saga/effects';
import { getUserName } from '../helpers/helper';

import {
    FECTH_LOYALTY,
    FECTH_LOYALTY_RECEIVED,
    FECTH_LOYALTY_FAILED,
    FECTH_PRODUCT,
    FECTH_PRODUCT_RECEIVED,
    FECTH_PRODUCT_FAILED,
    REDEEM_PRODUCT,
    REDEEM_PRODUCT_RECEIVED,
    REDEEM_PRODUCT_FAILED
} from '../actions/types';


let loyalties = [
    {'username': 'bob', points: 200},
    {'username': 'sam', points: 500},
    {'username': 'alice', points: 78}
]

let product = {
    'name': 'Airbus Flight',
    'options': [
        {'name': 'Bronze', value: 500},
        {'name': 'Silver', value: 300},
        {'name': 'Gold', value: 800}
    ]
}

function fetchSingleLoyaltyApi(payload) {
    return loyalties.find(loyalty => {
        return loyalty.username === payload.username;
    }) 
}

function fetchProductApi() {
    return product;
}

function redeemProductApi (payload) {
    let username = getUserName();
    let currentUserLoyalty =  loyalties.find(loyalty => {
        return loyalty.username === username;
    }); 
    currentUserLoyalty.points = payload.userPoints - payload.productValue;
    return currentUserLoyalty;
}

function* getUserLoyalty(action) {
    try {
        const response = yield call(fetchSingleLoyaltyApi, action);
        yield put({ type: FECTH_LOYALTY_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FECTH_LOYALTY_FAILED, error });
    }
}

function* getRedemptionProduct() {
    try {
        const response = yield call(fetchProductApi);
        yield put({ type: FECTH_PRODUCT_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FECTH_PRODUCT_FAILED, error });
    }
}

function* redeemProduct(action) {
    try {
        const response = yield call(redeemProductApi, action);
        console.log('response: ', response);   
        yield put({ type: REDEEM_PRODUCT_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: REDEEM_PRODUCT_FAILED, error });
    }
}

export function* watchGetLoyaltySaga() {
    yield takeLatest(FECTH_LOYALTY, getUserLoyalty);
}

export function* watchGetRedemptionProductSaga() {
    yield takeLatest(FECTH_PRODUCT, getRedemptionProduct);
}

export function* watchRedeemProductSaga() {
    yield takeLatest(REDEEM_PRODUCT, redeemProduct);
}