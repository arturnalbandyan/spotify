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

const initialState = {
    albumsList: [],
    trackList: [],
    errors: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALBUMS_REQUEST: {
            return {
                ...state,
                requestStatus: 'request',
                errors: {},
                albumsList: []
            };
        }
        case GET_ALBUMS_SUCCESS: {
            return {
                ...state,
                requestStatus: 'success',
                albumsList: action.payload.data.items,
            };
        }
        case GET_ALBUMS_FAIL: {
            return {
                ...state,
                requestStatus: 'fail',
                errors: action,
            };
        }
        case GET_ALBUMS_BY_ID_REQUEST: {
            return {
                ...state,
                requestStatus: 'request',
                errors: {},
                albumsList: []
            };
        }
        case GET_ALBUMS_BY_ID_SUCCESS: {
            return {
                ...state,
                requestStatus: 'success',
                albumsList: action.payload.data,
            };
        }
        case GET_ALBUMS_BY_ID_FAIL: {
            return {
                ...state,
                requestStatus: 'fail',
                errors: action,
            };
        }
        case GET_TRACK_REQUEST: {
            return {
                ...state,
                requestStatus: 'request',
                errors: {},
                trackList: []
            };
        }
        case GET_TRACK_SUCCESS: {
            return {
                ...state,
                requestStatus: 'success',
                trackList: action.payload.data.items,
            };
        }
        case GET_TRACK_FAIL: {
            return {
                ...state,
                requestStatus: 'fail',
                errors: action,
            };
        }

        default: {
            return state;
        }
    }
}
