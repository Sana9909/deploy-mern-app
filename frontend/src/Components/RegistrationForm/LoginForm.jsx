import React from 'react';
import './LoginForm.css';
import { FaUnlockAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import {ToastContainer} from 'react-toastify';
import { useState } from 'react';
import { handleError } from '../../utils';
import { handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    
    const [loginInfo, setLoginInfo]= useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange  = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        // console.log(copyRegInfo);
        setLoginInfo(copyLoginInfo);
    }


    const handleLogin = async(e) => {
        e.preventDefault();
        const {email, password} = loginInfo;
        if(!email || !password){
            return handleError("All fields are required");
        }
        try {
            const url = "https://deploy-mern-app-sable.vercel.app/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            console.log(result);
            const {message,success,error,jwtToken,name} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name);
                setTimeout(() => {
                    navigate('/homepage');
                },2000);
            } else if(error){
                handleError(message);
            } else if(!success){
                handleError(message);
            }
            // handleSuccess("Login successful");
        } catch (error) {
            handleError(error);
            // console.log(error.message);
        }
    }


    return (
        <div>

            <div className='wrapper poppins-regular'>
                <form onSubmit= {handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        {/* <label>Email</label> */}
                        <input type="email" name='email' onChange={handleChange} value={loginInfo.email} placeholder='Enter your email' />
                        <MdEmail className='icon'/>
                    </div>
                    <div className="input-box">
                        {/* <label>Password</label> */}
                        <input type="password" name='password' onChange={handleChange} value={loginInfo.password} placeholder='Enter your password' />
                        <FaUnlockAlt className='icon'/>
                    </div>
                    <div className='remember-forgot'>
                        <label><input type="checkbox" />Remember me</label>
                        <Link to="/*">Forgot Password?</Link>
                    </div>
                    <button type="submit">Login</button>
                    <div className='register-link'>
                        {/* <p>Don't have an account?<a href='./register'>  Register</a></p> */}
                        <p>Don't have an account?<Link to="/register"> Register</Link></p>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default LoginForm;
