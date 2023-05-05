import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/login.css';
import { useDispatch } from 'react-redux';
import { signup } from '../../Actions/auth';
import Loader from '../../Components/Loader/loader';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Signup = () => {
    const [formValue, setFormValue] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
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
        setIsText((perv) => !perv);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(signup(formValue, navigate)).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className='auth_container'>
            <div className='auth_header'>
                <h2>Focalize</h2>
            </div>
            <form onClick={handleFormSubmit} className='auth_form'>
                {/* <div className='auth_sub_conatiner'>
                </div> */}
                {/* <div className='auth_sub_conatiner'>
                </div> */}
                <label for='firstname'>First Name</label>
                    <input 
                        type='text'
                        className='auth_input'
                        id='firstname'
                        value={formValue.first_name}
                        name='first_name'
                        onChange={handleChange}
                        placeholder='First Name'
                    />
                    <label for='lastname'>Last Name</label>
                    <input 
                        type='text'
                        className='auth_input'
                        id='lastname'
                        value={formValue.last_name}
                        name='last_name'
                        onChange={handleChange}
                        placeholder='Last Name'
                    />
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
                    id='password'
                    value={formValue.password}
                    name='password'
                    onChange={handleChange}
                    placeholder='Enter Your Password'
                />
                {isLoading ? null : (
                    <div className='auth_icon_signup' onClick={showHandler}>
                        {isText ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                )}

                <label for='confirmpassword'>Confirm Password</label>
                <input 
                    type='password'
                    className='auth_input'
                    id='confirmpassword'
                    value={formValue.confirm_password}
                    name='confirm_password'
                    onChange={handleChange}
                    placeholder='Re-enter Your Password'
                />
                <div className='auth_btn_container'>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button
                            className='auth_btn'
                            disabled={!(formValue.email && formValue.password)}
                        >
                            Sign up
                        </button>
                    )}
                </div>
                <Link to='/'>
                    <p>Already have an account? Login here</p>
                </Link>
            </form>
        </div>
    );
}

export default Signup;