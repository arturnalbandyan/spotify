import {
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS,
    GET_ARTISTS_FAIL,
} from '../actions/artists';

const initialState = {
    artistsList: [],
    errors: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ARTISTS_REQUEST: {
            return {
                ...state,
                requestStatus: 'request',
                errors: {},
            };
        }
        case GET_ARTISTS_SUCCESS: {
            return {
                ...state,
                requestStatus: 'success',
                artistsList: action.payload.data.artists.items,
            };
        }
        case GET_ARTISTS_FAIL: {
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
