import { takeLatest, all, call, put } from 'redux-saga/effects';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.action';
import { USER_ACTION_TYPES } from './user.types';
import { getCurrentUser, signOutUser } from '../../../utils/firebase/firebase.utils';

import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword,
createAuthUserWithEmailAndPassword } from '../../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield(put(signInFailure(error)));
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth,userAuth);
    }catch(error)
    {
        yield(put(signInFailure(error)));
    }
}

export function* signInWithGoogle(){
    try{
       const {user} =  yield call(signInWithGooglePopup);
       yield call(getSnapshotFromUserAuth,user);
    }catch(error)
    {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmailAndPassword({payload: {email, password }})
{
    try{
        const {user} =  yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth,user);
     }catch(error)
     {
         yield put(signInFailure(error));
     }
}

export function* signUp({payload: {email, password, displayName}})
{
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, {displayName}));
    }catch(error)
    {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload:{user, additionalDetails}}){
   yield call(getSnapshotFromUserAuth, user, additionalDetails);
};

export function* signOut()
{
    try{
         yield call(signOutUser);
         yield put(signOutSuccess());
    }catch(error)
    {
        yield put(signOutFailure(error));
    }
}
 


export function* onSignInWithEmailAndPasswordStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* onSignInWithGoogleStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onSignInWithGoogleStart), call(onSignInWithEmailAndPasswordStart), 
        call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)] );
}