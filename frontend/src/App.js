import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import './App.css';
import { baseUrl } from './shared';
import Employees from './pages/Employees';
import Header from './components/Header';
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customer from './pages/Customer';
import Login from './pages/Login';
import Register from './pages/Register';

export const LoginContext = createContext();

function App() {

  function refreshTokens(){
    const url = baseUrl + "/api/token/refresh";

    if(!localStorage.refreshToken){
      return;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh: localStorage.refreshToken
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('jwtToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        setLoggedIn(true);
      });
  }

  useEffect(() => {
    const minute = 1000 * 60;
    refreshTokens();

    setInterval(refreshTokens, minute * 20);
  }, []);

  const [loggedIn, setLoggedIn] = useState(!!localStorage.jwtToken);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (!value) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path="employees" element={<Employees />}/>
            <Route path="dictionary" element={<Dictionary />}/>
            <Route path="dictionary/:search" element={<Definition />}/>
            <Route path="customers" element={<Customers />}/>
            <Route path="customers/:id" element={<Customer />}/>
            
            <Route path="404" element={<NotFound />}/>
            <Route path="*" element={<NotFound />}/>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App;
