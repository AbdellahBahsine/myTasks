import {useState} from 'react';
import './header.styles.css';

import { Link } from "react-router-dom";

import axios from 'axios';
import Cookies from 'js-cookie';

const Header = ({currentUser, setCurrentUser}) => {

    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
        setIsActive(!isActive)
    }

    const SignOut = () => {
        axios.post('/users/logout', {}, {withCredentials: true})
        .then(res => {
            setCurrentUser(null)
            Cookies.remove('authToken')
        })
        .catch(e => console.log(e))
    }

    return (
        <header className="bg-dark">
            <div className="container d-flex justify-content-between align-items-center h-100">
                <Link to="/" className="logo text-white"><h4>My<span className="text-danger">Tasks</span></h4></Link>
                {
                currentUser ?
                <div className="settings-container">
                    <button className="gear-icon" onClick={() => handleClick()}><i className="fas fa-cog text-white"></i></button>
                    <div className={isActive ? "settings px-2 active" : "settings px-2"}>
                        <Link to="/tasks"><button className="tasks-link py-2">My Tasks</button></Link>
                        <button className="signout-btn pb-2" onClick={() => SignOut()}>Sign out</button>
                    </div>
                </div>
                : <Link to="/register"><button className="btn btn-danger text-white">Register</button></Link>
                }
            </div>
        </header>
    )
}

export default Header;