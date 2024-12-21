import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const location= useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            setIsAuthenticated(true);
            if(location.pathname === "/login" || 
                location.pathname === "/register" ||
                location.pathname === "/"
            ){
                navigate("/homepage",{replace:false});
            }
        }
    },[location, navigate, setIsAuthenticated]);
  return (
    null
  )
}

export default RefreshHandler
