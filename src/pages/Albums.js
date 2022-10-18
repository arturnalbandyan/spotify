import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getAlbumsRequest} from "../store/actions/albums";
import spotifyIcon from '../assets/spotify.png'
import RingLoader from "react-spinners/RingLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Albums = (props) => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {errors, albums, getAlbumsRequest} = props;
    let token = window.localStorage.getItem("token")

    useEffect(() => {
        if (id) {
            getAlbumsRequest(id,token)
        }
    }, [])

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        createNotification(errors.message)
    }, [errors.message])

    const createNotification = (type) => {
        if (type === "Request failed with status code 401") {
            NotificationManager.error('TOKEN ERROR', 'Error!', 1500);
        }
    }

    return (
        <div className="albums">
            {!albums ?
                <div className="spinner__container">
                    <RingLoader
                        loading={true}
                        size={150}
                        className="loader"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div> :
                <>
                    <div className="header">
                        <img
                            onClick={() => navigate(`/`)}
                            className="spotify__icon"
                            src={spotifyIcon}
                            alt="spotify"
                        />
                    </div>
                    <div className="album__info__container">
                        {albums.length && albums.map((album) => {
                            if (album?.images[1]?.url) {
                                return (
                                    <div key={album?.id} onClick={() => navigate(`/tracks/${album?.id}`)}
                                         className="image__container">
                                        <img className="album__image" src={album?.images[1]?.url}
                                             alt={album?.name}/>
                                        <p className="album__name">{album?.name}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </>}
            <NotificationContainer/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    albums: state.albums.albumsList,
    errors: state.albums.errors
});

const mapDispatchToProps = {
    getAlbumsRequest
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Albums);

export default Container;
