export const GET_ALBUMS_REQUEST = 'GET_ALBUMS_REQUEST';
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const GET_ALBUMS_FAIL = 'GET_ALBUMS_FAIL';

export function getAlbumsRequest(id, token) {
    return {
        type: GET_ALBUMS_REQUEST,
        payload: {id, token}
    };
}

export const GET_ALBUMS_BY_ID_REQUEST = 'GET_ALBUMS_BY_ID_REQUEST';
export const GET_ALBUMS_BY_ID_SUCCESS = 'GET_ALBUMS_BY_ID_SUCCESS';
export const GET_ALBUMS_BY_ID_FAIL = 'GET_ALBUMS_BY_ID_FAIL';

export function getAlbumByIdRequest(id, token) {
    return {
        type: GET_ALBUMS_BY_ID_REQUEST,
        payload: {id, token}
    };
}

export const GET_TRACK_REQUEST = 'GET_TRACK_REQUEST';
export const GET_TRACK_SUCCESS = 'GET_TRACK_SUCCESS';
export const GET_TRACK_FAIL = 'GET_TRACK_FAIL';

export function getTrackRequest(id, token) {
    return {
        type: GET_TRACK_REQUEST,
        payload: {id, token}
    };
}
