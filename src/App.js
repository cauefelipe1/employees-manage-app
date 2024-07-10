import './App.css';
import Employees from './pages/Employees';
import Header from './components/Header';
import Customers from './pages/Customers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Header>
      <BrowserRouter>
        <Routes>
          <Route path="/employees" element={<Employees />}/>
          <Route path="/customers" element={<Customers />}/>
        </Routes>
      </BrowserRouter>
    </Header>
  )
}

export default App;
