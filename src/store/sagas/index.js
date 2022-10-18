import { all, fork } from 'redux-saga/effects';

import artists from './artists';
import albums from "./albums";

export default function* watchers() {
    yield all([
        artists,
        albums
    ].map(fork));
}
