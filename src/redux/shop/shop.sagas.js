import { takeEvery, call, put } from 'redux-saga/effects';

import { ShopActionTypes } from './shop.types';
import {fetchCollectionsFailed, fetchCollectionsSuccess} from './shop.actions';
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";

export function* fetchCollectionsAsync() {
  yield console.log('i am triggered!');

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call( convertCollectionsSnapshotToMap, snapshot );

    yield put(fetchCollectionsSuccess(collectionsMap));

  } catch  (error) {
    yield put(fetchCollectionsFailed(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
}