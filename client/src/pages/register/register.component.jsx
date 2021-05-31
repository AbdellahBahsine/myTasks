import {useState} from 'react';

import {Link} from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

const RegisterPage = ({setCurrentUser}) => {

    const [userCredentials, setUserCredentials] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        repeatPassword: false
    })

    const {username, email, password, repeatPassword} = userCredentials

    const handleChange = e => {
        const {name, value} = e.target

        setUserCredentials({...userCredentials, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {username, email, password}

        if(username.length === 0){
            return setErrors({username: true, email: false, password: false, repeatPassword: false})
        }

        if(email.length === 0){
            return setErrors({email: true, username: false, password: false, repeatPassword: false})
        }

        if(password.length === 0){
            return setErrors({username: false, email: false, password: true, repeatPassword: false})
        }

        if(repeatPassword.length === 0){
            return setErrors({username: false, email: false, password: false, repeatPassword: true})
        }

        if(password !== repeatPassword){
            return setErrors({username: false, email: false, password: true, repeatPassword: true})
        }

        axios.post('/users', data)
        .then(res => {
            console.log(res)
            if(res.data.code === 11000){
                return;
            } else{
                setCurrentUser(res.data.user)
                Cookies.set('authToken', res.data.token);
            }            
        })
        .catch(e => console.log(e))
    }

    return (
        <form className="border p-4 my-auto register-form" onSubmit={handleSubmit}>
            <h4 className="mb-4">Register</h4>
            <div className="form-group mb-4">
                <input type="text" className={errors.username ? "form-control border border-danger" : "form-control"} name="username" placeholder="Username" value={username} onChange={handleChange} />
            </div>
            <div className="form-group mb-4">
                <input type="email" className={errors.email ? "form-control border border-danger" : "form-control"} name="email" placeholder="Enter email" value={email} onChange={handleChange} />
            </div>
            <div className="form-group mb-4">
                <input type="password" className={errors.password ? "form-control border border-danger" : "form-control"} name="password" placeholder="Password" value={password} onChange={handleChange} />
            </div>
            <div className="form-group mb-4">
                <input type="password" className={errors.repeatPassword ? "form-control border border-danger" : "form-control"} name="repeatPassword" placeholder="Repeat Password" value={repeatPassword} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-danger text-white submit-btn">Submit</button>
            <p className="mt-3 text-secondary">Already have an account? <Link to="/">Login Here</Link></p>
        </form>
    )
}

export default RegisterPage;