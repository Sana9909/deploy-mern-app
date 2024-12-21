import React, { useEffect } from 'react';
import './LoginForm.css';
import {ToastContainer} from 'react-toastify';
import { useState } from 'react';
import { handleError } from '../../utils';
import { handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    
    const [loggedInUser, setLoggedInUser]= useState('');

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    },[]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess("Logout successful");
        setTimeout(() => {
            navigate('/login');
        },1000);
        // navigate('/login');
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
