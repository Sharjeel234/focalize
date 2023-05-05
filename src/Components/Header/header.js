import React, { useCallback, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './header.css';
import decode from 'jwt-decode';
import { toast } from "react-toastify";
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell
} from "@novu/notification-center";
import { BsFillMoonFill, BsFillSunFill, BsBlockquoteLeft } from 'react-icons/bs';
import { GrLogout } from 'react-icons/gr';
import NotificationList from './notificationList';

const Header = ({ theme, themeHandler }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = useCallback(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/");

        toast.success("Logged out Successfully")
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    
    }, [user?.token, handleLogout, location]);

    const handleLogin = () => {
        navigate("/");
    }
    
    const handleNotificationClick = (message) => {
        if(message?.cta?.data?.url)
        {
            window.location.href = message.cta.data.url;
        }
    }

    return (
        <header className='header'>
            <NovuProvider
                subscriberId = {user?.result?._id}
                applicationIdentifier = {process.env.NOVU_IDENTIFIER}
                initialFetchingStrategy = {{
                    fetchNotification: true,
                    fetchUserPreferences : true
                }}
            >
                <div className='header_container'>
                    <div className='header_left'>
                        <Link to="#">
                            <h3 className='header_brand' style={{ color: "#964bdb" }}>
                                Focalize
                            </h3>
                        </Link>
                    </div>
                    <div className='header_right'>
                        {user ? (
                            <>
                                <button
                                    onClick={() => navigate("/gallery")}
                                    className='header_theme_btn'
                                    style={{
                                        backgroundColor: theme ? "#fff" : "#efefef",
                                        color: theme ? "#000" : "#000",
                                        margin: "0rem 1rem"
                                    }}
                                >
                                    <BsBlockquoteLeft />
                                </button>
                                <button
                                    onClick={themeHandler}
                                    className='header_theme_btn'
                                    style={{
                                        backgroundColor: theme ? "#fff" : "#efefef",
                                        color: theme ? "#000" : "#000",
                                        margin: "0rem 1rem"
                                    }}
                                >
                                    {theme ? (
                                        <div className='header_theme_btn'>
                                            <BsFillSunFill />
                                        </div>
                                    ) : (
                                        <div className='header_theme_btn'>
                                            <BsFillMoonFill />
                                        </div>
                                    )}
                                </button>

                                <PopoverNotificationCenter 
                                    onNotificationClick = {handleNotificationClick}
                                    listItem={(notification) => (
                                        <NotificationList 
                                            notification={notification}
                                            theme={theme}
                                        />
                                    )}
                                    colorScheme = {theme ? "dark" : "light"}
                                >
                                    {({ unseenCount }) => (
                                        <NotificationBell unseenCount = {unseenCount} />
                                    )}
                                </PopoverNotificationCenter>

                                <button
                                    className='header_theme_btn'
                                    style={{ margin: "0rem 1rem" }}
                                >
                                    <GrLogout />
                                </button>
                            </>
                        ) : (
                            <button className='header_btn' onClick={handleLogin}>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </NovuProvider>
        </header>
    );
}

export default Header;