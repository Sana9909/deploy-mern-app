import React, { useEffect } from 'react';

import './LoginForm.css';
import {ToastContainer} from 'react-toastify';

import { handleError } from '../../utils';
import { handleSuccess } from '../../utils';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    
    const [loggedInUser, setLoggedInUser]= useState('');

    //useEffect is a Hook that allows you to perform side effects  
    // (like fetching data, setting up event listeners, or updating the DOM) in function components.
    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    },[]);

    const navigate = useNavigate();

    const handleLogout = () => {

        // localStorage.removeItem("token") will remove the token from the local storage of the user
        localStorage.removeItem("token");

        // localStorage.removeItem("loggedInUser") will remove the loggedInUser from the local storage of the user
        // when the user logs out
        // it will redirect the user to the login page
        localStorage.removeItem("loggedInUser");
        handleSuccess("Logout successful");
        setTimeout(() => {
            navigate('/login');
        },1000);
    }


    return (
        <div>
            <div className='wrapper poppins-regular'>
                <form action="">
                    <h1>Welcome</h1>
                    <h2 style={{margin: "20px"}}>{loggedInUser}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Homepage;
