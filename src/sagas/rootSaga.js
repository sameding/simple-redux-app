import { all, fork } from 'redux-saga/effects';

import * as authSagas from './authSaga'; 
import * as loyaltySagas from './loyaltySaga';

// import watchers from other files
export default function* rootSaga() {
  yield all([
        ...Object.values(authSagas),
        ...Object.values(loyaltySagas),
        // add other watchers to the array
    ].map(fork));
}
