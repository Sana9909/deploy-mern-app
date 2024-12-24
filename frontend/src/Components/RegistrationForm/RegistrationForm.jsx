// In React, useState is a function that allows users to add state to functional components. 
// It's used to manage and update state variables at the component level. 

// In React, the useState Hook allows you to add state to functional components. useState returns an array with two values: the current state and a function to update it.

// The Hook takes an initial state value as an argument and returns an updated state value whenever the setter function is called. It can be used like this:

// const [state, setState] = useState(initialValue);
// Here, the initialValue is the value you want to start with and state is the current state value that can be used in your component. 
// The setState function can be used to update the state, triggering a re-render of your component.

// The useState Hook in React is the equivalent of this.state/this.setSate for functional components.

import React from 'react';
import './LoginForm.css';

// Use the given command to use the icons
// npm install react-icons --save
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../../utils';
import { handleSuccess } from '../../utils';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {

    const [regInfo, setRegInfo]= useState({
        name: "",
        email: "",
        password: ""
    })

    // The useNavigate() hook in ReactJS is beneficial for: 
    // Handling User Interactions: Redirect users after certain actions, such as form submissions or login. 
    // Programmatic Redirection: Navigate to different routes based on application state or conditions
    const navigate = useNavigate();


//Whenever the user types something in the input field
//this function will be called
    const handleChange = (e) => {

        //Destructuring the object
        //The target is the input field
        const {name, value} = e.target;

        //Creates a copy of the object
        const copyRegInfo = {...regInfo};

        //Updates the copy
        copyRegInfo[name] = value;

        //Sets the state
        setRegInfo(copyRegInfo);
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        const {name, email, password} = regInfo;
        if(!name || !email || !password){
            return handleError("All fields are required");
        }
        try {
            const url = "https://deploy-mern-app-sable.vercel.app/auth/register";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    //The Content-Type header specifies the media type of the data being sent to the server
                    "Content-Type": "application/json"
                },
                //The JSON.stringify() method converts a JavaScript object or value to a JSON string
                body: JSON.stringify(regInfo)
            });

            //The json() method returns a promise that resolves to the JSON representation of the response
            const result = await response.json();
            const {message,success,error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                },2000);
            } else if(error){
                handleError(message);
            } else if(!success){
                handleError(message);
            }
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
                    <input type="text" name='name' placeholder='Enter your name' onChange={handleChange} value={regInfo.name} />
                    <FaUser className='icon'/>
                </div>
                <div className="input-box">
                    <input type="email" name='email' placeholder='Enter your email' onChange={handleChange} value={regInfo.email} />
                    <MdEmail className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" name='password' placeholder='Enter your password' onChange={handleChange} value={regInfo.password} />
                    <FaUnlockAlt className='icon'/>
                </div>
                <button type="submit">Register</button>
                <div className='register-link'>
                    <p>Already have an account?<Link to='/login'> Login</Link></p>
                </div>
            </form>
        </div>
        //The ToastContainer component is a container for Toast components
        < ToastContainer />
    </div>
    )
}

export default RegistrationForm;
