import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import RingLoader from "react-spinners/RingLoader";
import spotifyIcon from '../assets/spotify.png'

const clientId = process.env.REACT_APP_CLIENT_ID
const redirectUri = process.env.REACT_APP_REDIRECT_URI
const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT
const responseType = process.env.REACT_APP_RESPONSE_TYPE

const Login = (props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("")
    const {albums} = props;

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        if (token) {
            navigate('/artists')
        }
    }, [])

    useEffect(() => {
        if (token) {
            navigate('/artists')
        } else {
            setToken("")
        }
    }, [token])

    if (!token) {
        return (
            <div className="login">
                {!albums ?
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
                    <div className="login__container">
                        <img src={spotifyIcon} className="spotify__icon" alt="spotify_icon"/>
                        <a
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
                            className="login__button"
                        >
                            <span>Sign In</span>
                        </a>
                    </div>
                }
                <NotificationContainer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    albums: state.albums.albumsList,
    errors: state.albums.errors
});

const mapDispatchToProps = {};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default Container;
