import './App.css';
import Employees from './pages/Employees';
import Header from './components/Header';
import Customers from './pages/Customers';
import Dictionary from './components/Dictionary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />}/>
          <Route path="/dictionary" element={<Dictionary />}/>
          <Route path="/customers" element={<Customers />}/>
        </Routes>
      </Header>
    </BrowserRouter>
  )
}

export default App;
