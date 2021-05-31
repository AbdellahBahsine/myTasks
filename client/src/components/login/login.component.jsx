import {useState} from 'react';

import { Link } from "react-router-dom";

import axios from 'axios';
import Cookies from 'js-cookie';

const Login = ({setCurrentUser}) => {

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    })
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const {email, password} = userCredentials

    const handleChange = e => {
        const {name, value} = e.target

        setUserCredentials({...userCredentials, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {email, password}

        if(email.length === 0){
            setPasswordError(false)
            return setEmailError(true)
        }

        if(password.length === 0){
            setEmailError(false)
            return setPasswordError(true)
        }

        axios.post('/users/login', data, {withCredentials: true})
        .then(res => {
            console.log(res)
            if(res.data.error){
                return;
            } else{
                setCurrentUser(res.data.user)
                Cookies.set('authToken', res.data.token);
            }
        })
        .catch(e => console.log(e))
    }

    return (
        <form className="border p-4 login-form" onSubmit={handleSubmit}>
            <h4 className="mb-4">Log In</h4>
            <div className="form-group mb-4">
                <input type="email" className={emailError ? "form-control border border-danger" : "form-control"} name="email" placeholder="Enter email" onChange={handleChange} />
            </div>
            <div className="form-group mb-4">
                <input type="password" className={passwordError ? "form-control border border-danger" : "form-control"} name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-danger text-white submit-btn">Submit</button>
            <p className="mt-3 text-secondary">Don't have an account? <Link to="/register">Register Here</Link></p>
        </form>
    )
}

export default Login;