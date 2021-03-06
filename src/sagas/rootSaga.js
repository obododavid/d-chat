import { all } from "redux-saga/effects";
import signUpSaga from "./signUpSaga";
import loginSaga from "./loginSaga";
import signOutSaga from "./signOutSaga";
import messagesSaga from "./messagesSaga";
import statusSaga from "./statusSaga";
import pictureSaga from "./pictureSaga";

export default function* rootSaga() {
    yield all([
        signUpSaga(),
        loginSaga(),
        signOutSaga(),
        messagesSaga(),
        statusSaga(),
        pictureSaga(),
    ]);
};