import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

import './App.css';
import Employees from './pages/Employees';
import Header from './components/Header';
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customer from './pages/Customer';
import Login from './pages/Login';

export const LoginContext = createContext();

function App() {

  const [loggedIn, setLoggedIn] = useState();

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/employees" element={<Employees />}/>
            <Route path="/dictionary" element={<Dictionary />}/>
            <Route path="/dictionary/:search" element={<Definition />}/>
            <Route path="/customers" element={<Customers />}/>
            <Route path="/customers/:id" element={<Customer />}/>
            <Route path="/404" element={<NotFound />}/>
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App;
