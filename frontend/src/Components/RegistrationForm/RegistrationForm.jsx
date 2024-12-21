import React from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { handleError } from '../../utils';
import { handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {

    const [regInfo, setRegInfo]= useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copyRegInfo = {...regInfo};
        copyRegInfo[name] = value;
        // console.log(copyRegInfo);
        setRegInfo(copyRegInfo);
    }
    console.log("reg info--->",regInfo);

    const handleRegister = async(e) => {
        e.preventDefault();
        const {name, email, password} = regInfo;
        if(!name || !email || !password){
            return handleError("All fields are required");
        }
        try {
            const url = "http://localhost:8080/auth/register";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(regInfo)
            });
            const result = await response.json();
            const {message,success,error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                },2000);
                // handleSuccess("Registration successful");
            } else if(error){
                handleError(message);
            } else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError(error);
        }
    }


    return (
    <div>

        <div className='wrapper poppins-regular'>
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="input-box">
                    {/* <label>Email</label> */}
                    <input type="text" name='name' placeholder='Enter your name' onChange={handleChange} value={regInfo.name} />
                    <FaUser className='icon'/>
                </div>
                <div className="input-box">
                    {/* <label>Email</label> */}
                    <input type="email" name='email' placeholder='Enter your email' onChange={handleChange} value={regInfo.email} />
                    <MdEmail className='icon'/>
                </div>
                <div className="input-box">
                    {/* <label>Password</label> */}
                    <input type="password" name='password' placeholder='Enter your password' onChange={handleChange} value={regInfo.password} />
                    <FaUnlockAlt className='icon'/>
                </div>
                {/* <div className='remember-forgot'> */}
                    {/* <label><input type="checkbox"/>Remember me</label> */}
                    {/* <a href="#">Forgot Password?</a> */}
                {/* </div> */}
                <button type="submit">Register</button>
                <div className='register-link'>
                    <p>Already have an account?<Link to='/login'> Login</Link></p>
                </div>
            </form>
        </div>
        < ToastContainer />
    </div>
  )
}

export default RegistrationForm;
