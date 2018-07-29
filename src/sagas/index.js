import { call, put, fork, take, select } from 'redux-saga/effects';
import { REQUEST_LIST, successList, failureList, updateHaveList, UPDATE_HAVE_LIST } from '../actions';
import API from '../api';

function* handleGetList() {
  while (true) {
    yield take(REQUEST_LIST);
    const { data, error } = yield call(API.getMyCharaList);
    if (data && !error) {
      yield put(successList({ data }));
    } else {
      yield put(failureList({ error }));
    }
  }
}

// ローカルストレージからstateに読み込む
function* handleLoad() {
  const data = localStorage.getItem('data');
  if (data) {
    const payload = {
      list: JSON.parse(data),
      action: 'add'
    };
    yield put(updateHaveList(payload));
  }
}

// stateからローカルストレージに書き込む
function* handleSave() {
  while (true) {
    yield take(UPDATE_HAVE_LIST);
    const data = yield select();
    localStorage.setItem('data', JSON.stringify(data.reducer.have));
  }
}

export default function* rootSaga() {
  yield call(handleLoad);
  yield fork(handleGetList);
  yield fork(handleSave);
}
