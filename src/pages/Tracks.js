import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getAlbumByIdRequest, getTrackRequest} from "../store/actions/albums";
import {AudioPlayerControlSprite, AudioPlayer} from 'react-audio-player-pro';
import RingLoader from "react-spinners/RingLoader";
import {NotificationContainer, NotificationManager} from "react-notifications";

const Albums = (props) => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {errors, albums, trackList, getTrackRequest, getAlbumByIdRequest} = props;
    let token = window.localStorage.getItem("token")
    const audioTrackList = [];

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])

    trackList.forEach(track => {
        console.log(444,track.preview_url)
        if(track.preview_url){
            audioTrackList.push({
                    src: track.preview_url,
                    preload: 'auto',
                    duration: track.duration_ms,
                    content: <p>{track.name}</p>,
                    mediaMetadata: {
                        title: track.name,
                        artist: track?.artists[0]?.name,
                    },
                }
            )
        }
    })

    useEffect(() => {
        if (id) {
            getAlbumByIdRequest(id, token);
            getTrackRequest(id, token)
        }
    }, [])

    useEffect(() => {
        createNotification(errors.message)
    }, [errors.message])

    const createNotification = (type) => {
        if (type === "Request failed with status code 401") {
            NotificationManager.error('TOKEN ERROR', 'Error!', 20000);
        }
    }

    return (
        <div className="tracks">
            {!albums?.images?.[1].url && trackList ?
                <div className="spinner__container">
                    <RingLoader
                        loading={true}
                        size={150}
                        className="loader"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                :
                <>
                    <div className="header">
                        <img className="album__image" src={albums?.images?.[1].url} alt="album_image"/>
                        <div className="album__info">
                            <p className="albums__type">{albums?.album_type}</p>
                            <p className="album__name">{albums?.name}</p>
                            <div className="info__footer">
                                <img className="min__album__image" src={albums?.images?.[1].url} alt=""/>
                                <p className="albums__type">{`${albums?.label} • ${albums?.release_date} • ${albums?.tracks?.items?.length} song`}</p>
                            </div>
                        </div>
                    </div>
                    <>
                        <AudioPlayerControlSprite/>
                        <AudioPlayer
                            trackList={audioTrackList}
                            className="audio__player"
                            defaultState={{
                                isMuted: false,
                                activeIndex: 0,
                                isShuffleOn: false,
                                isTrackListOpen: true,
                                repeatingState: 'none',
                            }}
                        />
                    </>
                </>
            }
            <NotificationContainer/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    trackList: state.albums.trackList,
    albums: state.albums.albumsList,
    errors: state.albums.errors

});

const mapDispatchToProps = {
    getTrackRequest,
    getAlbumByIdRequest
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Albums);

export default Container;
