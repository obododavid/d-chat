import firebase from 'firebase/app';
import { firestore } from '../index';
import { takeEvery, put, all, call } from "redux-saga/effects";
import { REQUEST_SIGNUP_START } from "../constants/action-types";
import { requestSignUpSuccess, requestSignUpError } from '../actions/authActions';

//worker saga: fired on each REQUEST_SIGNUP_START action
function* handleUserSignUp({ payload }) {
    const { email, password, firstName, lastName } = payload;
    try {
        const auth = firebase.auth()
        const user = yield call(
            [auth, auth.createUserWithEmailAndPassword],
            email,
            password
        )
        console.log(user)
        if (user) {
            firestore.collection('users').doc(user.user.uid).set({
                firstName: firstName,
                lastName: lastName,
            })
            yield put(requestSignUpSuccess(user))
        }
    } catch (err) {
        yield put(requestSignUpError(err.message))
    }
}

//watcher saga: watches for which action is fired
function* watchSignUpUser() {
    yield takeEvery(REQUEST_SIGNUP_START, handleUserSignUp);
}

export default function* () {
    yield all([watchSignUpUser()]);
}
