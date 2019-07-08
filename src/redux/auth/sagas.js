import { call, put, takeEvery } from 'redux-saga/effects';

import {
  deleteUser,
  setUser,
  getToken,
  getUser,
} from 'helpers/storage/auth';
import * as httpAuth from 'http/auth';

import { actions as types } from './index';

function* onAuthenticate({ payload }) {
  try {
    const data = {
      user: {
        name: "Brad",
      },
      token: "123421asdfas123",
    };
    yield call(setUser, data.user, data.token);
    yield put(types.authenticateSuccess(data));
    
    // if (data.user.role !== 'admin') {
    //   const err = 'You are not permitted';
    //   yield put(types.authenticateFailure({ message: err }));
    // } else {
    //   yield call(setUser, data.user, data.token);
    //   yield put(types.authenticateSuccess(data));
    // }
  } catch (error) {
    let err;
    if (error.response.data === 'Unauthorized') {
      err = 'You\'ve entered an incorrect email address or password';
    } else {
      err = 'Unknown error';
    }
    yield put(types.authenticateFailure({ message: err }));
  }
}

function* onIsAuthenticated() {
  const token = getToken();
  if (token) {
    const user = getUser();
    const data = { token, user };
    yield put(types.isAuthenticatedSuccess(data));
  } else {
    yield put(types.isAuthenticatedFailure());
  }
}

function* onLogout() {
  try {
    yield call(deleteUser);
    yield put(types.logoutSuccess());
  } catch (error) {
    yield put(types.logoutFailure(error.response.data));
  }
}

const authSagas = [
  takeEvery(types.authenticateRequest, onAuthenticate),
  takeEvery(types.isAuthenticatedRequest, onIsAuthenticated),
  takeEvery(types.logoutRequest, onLogout),
];

export default authSagas;
