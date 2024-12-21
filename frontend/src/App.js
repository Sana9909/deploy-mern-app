// Difference between Router and BrowserRouter-

// The difference between <Router> and <BrowserRouter> is that BrowserRouter handles
// the history automatically for us and if we need to access the history outside of a react component 
// we need to use Router.

// BrowserRouter A that uses the HTML5 history API (pushState, replaceState and the popstate event)
//  to keep your UI in sync with the URL.

// Router The common low-level interface for all router components.
//  Typically apps will use one of the high-level routers instead: BrowserRouter, HashRouter, MemoryRouter, NativeRouter, StaticRouter

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"; 

//To change browser logo, change the favicon.ico

import './App.css';

// Importing Components from Components folder made by us
import LoginForm from './Components/RegistrationForm/LoginForm';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import Homepage from './Components/RegistrationForm/Homepage';
import PageNotFound from './Components/RegistrationForm/PageNotFound';
import RefreshHandler from "./RefreshHandler";
import { useState } from 'react';

//This is the main App component
// This sets up the client side routing for a react App.
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  };


  return (
    <BrowserRouter>
      <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          {/* These are the routes for our app */}
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/homepage" element={<PrivateRoute element={<Homepage />} />} />
          {/* <Route path="/homepage?" element={<Navigate replace to="/login" />} /> */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
