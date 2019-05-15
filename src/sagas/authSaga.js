import { put, takeLatest, call } from 'redux-saga/effects';

import {
    AUTHENTICATE_USER,
    TOKEN,
    TOKEN_FAILED
 } from '../actions/types';

 function fetchAuthenticationApi(data) {
    let credentials = {
        "username": data.payload.username,
        "password": data.payload.password
    }

    if(credentials.username === 'sam' && credentials.password === 'papa'){
        return credentials;
    } else {
        throw new Error('Whoops!')
    }
}

function* getAndSetUser(action) {
    try {
        const response = yield call(fetchAuthenticationApi, action);
        localStorage.setItem("username", response.username);
        localStorage.setItem("token", response.password);
        yield put({ type: TOKEN, response });
    }
    catch(error) {
        yield put({ type: TOKEN_FAILED, error });
    }
}

export function* watchGetTokenSaga() {
    yield takeLatest(AUTHENTICATE_USER, getAndSetUser)
}
