import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {getArtistsRequest} from "../store/actions/artists";
import RingLoader from "react-spinners/RingLoader";
import {NotificationContainer, NotificationManager} from "react-notifications";

const Artists = (props) => {
    const [artistName, setArtistName] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const navigate = useNavigate();
    const {errors, artists, getArtistsRequest} = props;

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])

    useEffect(() => {

        if (artistName !== "") {
            getArtistsRequest(artistName, token)
        }
    }, [artistName])

    useEffect(() => {
        createNotification(errors.message)
    }, [errors.message])

    const createNotification = (type) => {
        if (type === "Request failed with status code 401") {
            NotificationManager.error('TOKEN ERROR', 'Error!', 1500);
        }
    }

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return (
        <div className="artists">
            {!artists ?
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
                        <img className="spotify__icon" src="spotify.png" alt="spotify"/>
                        <div className="input__container">
                            <img onClick={() => setArtistName('')} className="search__icon" src="search.png"
                                 alt="search"/>
                            <input
                                placeholder="What do you want to listen to?"
                                type="text"
                                value={artistName}
                                onChange={(ev) => setArtistName(ev.target.value)}
                            />
                            <img onClick={() => setArtistName('')} className="clear__icon" src="x.png" alt="x"/>
                        </div>
                        <div className="logout__container">
                            <button
                                className="logout__button"
                                onClick={logout}
                            >
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                    <div className="artist__info__container">
                        {artists && artists.map((artist) => {
                            if (artist?.images[1]?.url) {
                                return (
                                    <div
                                        key={artist.id}
                                        className="image__container"
                                        onClick={() => navigate(`/albums/${artist.id}`)}
                                    >
                                        <img className="artist__image" src={artist?.images[1]?.url} alt={artist.name}/>
                                        <p className="artist__name">{artist.name}</p>
                                        <p className="artist__type">{artist.type}</p>
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
    artists: state.artists.artistsList,
    errors: state.artists.errors
});

const mapDispatchToProps = {
    getArtistsRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Artists);

export default Container;
