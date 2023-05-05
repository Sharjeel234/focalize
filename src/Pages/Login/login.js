import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useDispatch } from 'react-redux';
import { signin } from '../../Actions/auth';
import Loader from '../../Components/Loader/loader';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Login = () => {
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false)
    const [isText, setIsText] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    }

    const showHandler = () => {
        setIsText((prev) => !prev);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        dispatch(signin(formValue, navigate)).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div className='auth_container'>
            <div className='auth_header'>
                <h2>Focalize</h2>
            </div>
            <form onSubmit={handleFormSubmit} className='auth_form'>
                <label for='email'>Email</label>
                <input 
                    type='text'
                    className='auth_input'
                    id='email'
                    value={formValue.email}
                    name='email'
                    onChange={handleChange}
                    placeholder='Enter Your Email'
                />
                <label for='password'>Password</label>
                <input 
                    type={isText ? 'text' : 'password'}
                    className='auth_input'
                    id='passworrd'
                    value={formValue.password}
                    name='password'
                    onChange={handleChange}
                    placeholder='Enter Your Password'
                />
                {isLoading ? null : (
                    <div className='auth_icon' onClick={showHandler}>
                        {isText ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                )}
                <div className='auth_btn_container'>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className='auth_btn' disabled={!(formValue.email && formValue.password)}>
                            Login
                        </button>
                    )}
                </div>
                <Link to='/signup'>
                    <p>Don't have an account? Signup here</p>
                </Link>
            </form>
        </div>
    );
}

export default Login;