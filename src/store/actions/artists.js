export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAIL = 'GET_ARTISTS_FAIL';

export function getArtistsRequest(search, token) {
  return {
    type: GET_ARTISTS_REQUEST,
    payload: {search, token}
  };
}
