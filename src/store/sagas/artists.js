import {takeLatest, call, put} from 'redux-saga/effects';
import {
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS,
    GET_ARTISTS_FAIL,
} from '../actions/artists';
import Api from '../../Api';

function* getArtistsHandler(action) {
    try {
        const {data} = yield call(Api.getArtist, action.payload);
        yield put({
            type: GET_ARTISTS_SUCCESS,
            payload: {data},
        });
    } catch (e) {
        console.log("ERROR",e)
        yield put({
            type: GET_ARTISTS_FAIL,
            message: e.message,
        });
    }
}

export default function* watcher() {
    yield takeLatest(GET_ARTISTS_REQUEST, getArtistsHandler);
}

