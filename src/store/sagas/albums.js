import {takeLatest, call, put} from 'redux-saga/effects';
import {
    GET_ALBUMS_REQUEST,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAIL,
    GET_TRACK_REQUEST,
    GET_TRACK_SUCCESS,
    GET_TRACK_FAIL,
    GET_ALBUMS_BY_ID_REQUEST,
    GET_ALBUMS_BY_ID_SUCCESS,
    GET_ALBUMS_BY_ID_FAIL
} from '../actions/albums';
import Api from '../../Api';

function* getArtistsAlbumsHandler(action) {
    try {
        const {data} = yield call(Api.getArtistsAlbums, action.payload);
        yield put({
            type: GET_ALBUMS_SUCCESS,
            payload: {data},
        });
    } catch (e) {
        console.log("ERROR", e)
        yield put({
            type: GET_ALBUMS_FAIL,
            message: e.message,
        });
    }
}

function* getAlbumByIdHandler(action) {
    try {
        const {data} = yield call(Api.getAlbumById, action.payload);
        yield put({
            type: GET_ALBUMS_BY_ID_SUCCESS,
            payload: {data},
        });
    } catch (e) {
        console.log("ERROR", e)
        yield put({
            type: GET_ALBUMS_BY_ID_FAIL,
            message: e.message,
        });
    }
}

function* getTrackHandler(action) {
    try {
        const {data} = yield call(Api.getAlbumTracks, action.payload);
        yield put({
            type: GET_TRACK_SUCCESS,
            payload: {data},
        });
    } catch (e) {
        console.log("ERROR", e)
        yield put({
            type: GET_TRACK_FAIL,
            message: e.message,
        });
    }
}

export default function* watcher() {
    yield takeLatest(GET_ALBUMS_REQUEST, getArtistsAlbumsHandler);
    yield takeLatest(GET_ALBUMS_BY_ID_REQUEST, getAlbumByIdHandler);
    yield takeLatest(GET_TRACK_REQUEST, getTrackHandler);
}

