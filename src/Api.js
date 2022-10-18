import axios from 'axios';
import {stringify as qs} from 'querystringify';

const baseUrl = 'https://api.spotify.com';

class Api {
    static getArtist(data) {
        const query = qs({
            q: data.search,
            type: 'artist',
        });

        return axios.get(`${baseUrl}/v1/search?${query}&limit=50`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':`Bearer ${data.token}`
            }
        });
    }

    static getArtistsAlbums(data) {
        return axios.get(`${baseUrl}/v1/artists/${data.id}/albums`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':`Bearer ${data.token}`
            }
        });
    }

    static getAlbumTracks(data) {
        return axios.get(`${baseUrl}/v1/albums/${data.id}/tracks`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':`Bearer ${data.token}`
            }
        });
    }

    static getAlbumById(data) {
        return axios.get(`${baseUrl}/v1/albums/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':`Bearer ${data.token}`
            }
        });
    }
}

export default Api;
